from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base


class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    service = Column(String, nullable=False)
    property_location = Column(String, nullable=False)
    property_type = Column(String, nullable=False)
    message = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
