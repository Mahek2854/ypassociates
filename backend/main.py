import os
import secrets
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import List

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Enquiry
from schemas import EnquiryCreate, EnquiryResponse

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Y.P. & Associates API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBasic()


def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(
        credentials.username, os.getenv("ADMIN_USERNAME", "admin")
    )
    correct_password = secrets.compare_digest(
        credentials.password, os.getenv("ADMIN_PASSWORD", "admin123")
    )
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


def send_email_notification(enquiry: EnquiryCreate):
    sender = os.getenv("EMAIL_SENDER")
    password = os.getenv("EMAIL_PASSWORD")
    recipient = os.getenv("EMAIL_RECIPIENT", sender)

    if not sender or not password or sender == "your-email@gmail.com":
        return

    try:
        msg = MIMEMultipart()
        msg["From"] = sender
        msg["To"] = recipient
        msg["Subject"] = f"New Enquiry — {enquiry.name} | Y.P. & Associates"

        body = f"""New property valuation enquiry received:

Name:              {enquiry.name}
Phone:             {enquiry.phone}
Email:             {enquiry.email}
Service:           {enquiry.service}
Property Location: {enquiry.property_location}
Property Type:     {enquiry.property_type}
Message:           {enquiry.message or 'N/A'}

Received: {datetime.utcnow().strftime('%d %b %Y, %H:%M UTC')}
"""
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender, password)
            server.sendmail(sender, recipient, msg.as_string())
    except Exception as exc:
        print(f"Email notification failed: {exc}")


@app.post("/api/enquiry", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
def create_enquiry(enquiry: EnquiryCreate, db: Session = Depends(get_db)):
    db_enquiry = Enquiry(**enquiry.model_dump())
    db.add(db_enquiry)
    db.commit()
    db.refresh(db_enquiry)
    send_email_notification(enquiry)
    return db_enquiry


@app.get("/api/enquiries", response_model=List[EnquiryResponse])
def list_enquiries(
    db: Session = Depends(get_db),
    _: str = Depends(verify_admin),
):
    return db.query(Enquiry).order_by(Enquiry.created_at.desc()).all()


@app.delete("/api/enquiries/{enquiry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_enquiry(
    enquiry_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(verify_admin),
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    db.delete(enquiry)
    db.commit()
