from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EnquiryCreate(BaseModel):
    name: str
    phone: str
    email: str
    service: str
    property_location: str
    property_type: str
    message: Optional[str] = None


class EnquiryResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    service: str
    property_location: str
    property_type: str
    message: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}
