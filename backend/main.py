import json
import logging
import os
import re
import uuid
from datetime import datetime, timezone
from typing import List, Optional

import aiofiles
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, File, Form, HTTPException, Request, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.staticfiles import StaticFiles
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Enquiry
from schemas import EnquiryResponse

load_dotenv()

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# ── Upload directory ──────────────────────────────────────────────────────────
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
ALLOWED_EXTENSIONS = {"pdf", "jpg", "jpeg", "png", "doc", "docx"}
MAX_FILE_SIZE = 25 * 1024 * 1024  # 25 MB

# ── Database ──────────────────────────────────────────────────────────────────
Base.metadata.create_all(bind=engine)

# Auto-add uploaded_files column if upgrading from older schema
def _migrate():
    try:
        cols = [c["name"] for c in inspect(engine).get_columns("enquiries")]
        if "uploaded_files" not in cols:
            with engine.connect() as conn:
                conn.execute(text("ALTER TABLE enquiries ADD COLUMN uploaded_files VARCHAR"))
                conn.commit()
            logger.info("Migrated: added uploaded_files column")
    except Exception as e:
        logger.warning("Migration check skipped: %s", e)

_migrate()

# ── Rate limiter ──────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(title="Y.P. & Associates API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Serve uploaded files at /uploads/<filename>
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ── CORS ──────────────────────────────────────────────────────────────────────
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000")
allowed_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Auth ──────────────────────────────────────────────────────────────────────
bearer = HTTPBearer()

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    expected = os.getenv("ADMIN_SECRET_TOKEN", "")
    if not expected or credentials.credentials != expected:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing token")
    return credentials.credentials


# ── Email (Resend) ────────────────────────────────────────────────────────────
def send_email_notification(name, phone, email, service, location, prop_type, message) -> None:
    api_key = os.getenv("RESEND_API_KEY", "")
    recipient = os.getenv("EMAIL_RECIPIENT", "")
    if not api_key or not recipient:
        return
    try:
        import resend
        resend.api_key = api_key
        resend.Emails.send({
            "from": "Y.P. & Associates <noreply@ypassociates.in>",
            "to": [recipient],
            "subject": f"New Enquiry — {name} | Y.P. & Associates",
            "html": f"""
<h2>New Property Valuation Enquiry</h2>
<table style="border-collapse:collapse;width:100%">
  <tr><td><b>Name</b></td><td>{name}</td></tr>
  <tr><td><b>Phone</b></td><td>{phone}</td></tr>
  <tr><td><b>Email</b></td><td>{email}</td></tr>
  <tr><td><b>Service</b></td><td>{service}</td></tr>
  <tr><td><b>Location</b></td><td>{location}</td></tr>
  <tr><td><b>Property Type</b></td><td>{prop_type}</td></tr>
  <tr><td><b>Message</b></td><td>{message or "N/A"}</td></tr>
</table>
<p style="color:#888">Received: {datetime.now(timezone.utc).strftime("%d %b %Y, %H:%M UTC")}</p>
""",
        })
        logger.info("Email sent for enquiry from %s", email)
    except Exception as exc:
        logger.error("Email failed: %s", exc)


# ── Startup ───────────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    db_url = os.getenv("DATABASE_URL", "sqlite:///./enquiries.db")
    masked = db_url.split("@")[-1] if "@" in db_url else db_url
    logger.info("YP Associates API v1.0.0 starting — db: %s", masked)


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/health")
def health_check():
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.post("/api/enquiry", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_enquiry(
    request: Request,
    name: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    service: str = Form(...),
    property_location: str = Form(...),
    property_type: str = Form(...),
    message: Optional[str] = Form(None),
    website: Optional[str] = Form(None),
    files: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db),
):
    # Honeypot
    if website:
        logger.warning("Honeypot triggered from %s", request.client.host)
        return JSONResponse(status_code=201, content={
            "id": 0, "name": name, "phone": phone, "email": email,
            "service": service, "property_location": property_location,
            "property_type": property_type, "message": message,
            "uploaded_files": None, "created_at": datetime.now(timezone.utc).isoformat(),
        })

    # Basic validation
    name = name.strip()
    if len(name) < 2:
        raise HTTPException(status_code=422, detail="Name must be at least 2 characters")
    phone = re.sub(r"[\s\-]", "", phone)
    if not re.match(r"^[6-9]\d{9}$", phone):
        raise HTTPException(status_code=422, detail="Enter a valid 10-digit Indian mobile number")

    # Save uploaded files
    saved_files = []
    for upload in files:
        if not upload.filename:
            continue
        ext = upload.filename.rsplit(".", 1)[-1].lower() if "." in upload.filename else ""
        if ext not in ALLOWED_EXTENSIONS:
            continue
        content = await upload.read()
        if len(content) > MAX_FILE_SIZE:
            logger.warning("File %s skipped — too large (%d bytes)", upload.filename, len(content))
            continue
        unique_name = f"{uuid.uuid4().hex}_{upload.filename}"
        async with aiofiles.open(os.path.join(UPLOAD_DIR, unique_name), "wb") as f:
            await f.write(content)
        saved_files.append(unique_name)
        logger.info("Saved file: %s", unique_name)

    db_enquiry = Enquiry(
        name=name, phone=phone, email=email,
        service=service, property_location=property_location,
        property_type=property_type, message=message,
        uploaded_files=json.dumps(saved_files) if saved_files else None,
    )
    db.add(db_enquiry)
    db.commit()
    db.refresh(db_enquiry)

    logger.info("New enquiry #%d from %s (%s)", db_enquiry.id, name, request.client.host)
    send_email_notification(name, phone, email, service, property_location, property_type, message)
    return db_enquiry


@app.get("/api/enquiries", response_model=List[EnquiryResponse])
def list_enquiries(db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    return db.query(Enquiry).order_by(Enquiry.created_at.desc()).all()


@app.delete("/api/enquiries/{enquiry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_enquiry(enquiry_id: int, db: Session = Depends(get_db), _: str = Depends(verify_admin)):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    # Delete files from disk
    if enquiry.uploaded_files:
        for fname in json.loads(enquiry.uploaded_files):
            try:
                os.remove(os.path.join(UPLOAD_DIR, fname))
            except OSError:
                pass
    db.delete(enquiry)
    db.commit()
