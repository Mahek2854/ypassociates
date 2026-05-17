import re
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, field_validator


class EnquiryCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    service: str
    property_location: str
    property_type: str
    message: Optional[str] = None
    website: Optional[str] = None  # honeypot — silently discard if non-empty

    @field_validator("name")
    @classmethod
    def name_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        if len(v) > 100:
            raise ValueError("Name must be under 100 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_valid(cls, v: str) -> str:
        cleaned = v.replace(" ", "").replace("-", "")
        if not re.match(r"^[6-9]\d{9}$", cleaned):
            raise ValueError("Enter a valid 10-digit Indian mobile number")
        return cleaned

    @field_validator("message")
    @classmethod
    def message_length(cls, v: Optional[str]) -> Optional[str]:
        if v and len(v) > 1000:
            raise ValueError("Message must be under 1000 characters")
        return v


class EnquiryResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    service: str
    property_location: str
    property_type: str
    message: Optional[str]
    uploaded_files: Optional[str] = None  # JSON string of filenames
    created_at: datetime

    model_config = {"from_attributes": True}
