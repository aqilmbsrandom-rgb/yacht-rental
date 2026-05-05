from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Booking Models
class BookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    date: str
    boat: str
    boatName: Optional[str] = None
    packageType: Optional[str] = None
    guestCount: str
    eventType: str
    message: Optional[str] = None


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    date: str
    boat: str
    boatName: Optional[str] = None
    packageType: Optional[str] = None
    guestCount: str
    eventType: str
    message: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Email configuration
BOOKING_EMAIL = os.environ.get("BOOKING_EMAIL", "aqilmbsrandom@gmail.com")
EMAILJS_SERVICE_ID = os.environ.get("EMAILJS_SERVICE_ID")
EMAILJS_TEMPLATE_ID = os.environ.get("EMAILJS_TEMPLATE_ID")
EMAILJS_PUBLIC_KEY = os.environ.get("EMAILJS_PUBLIC_KEY")
EMAILJS_PRIVATE_KEY = os.environ.get("EMAILJS_PRIVATE_KEY")  # Optional access token
EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send"


def send_booking_email(booking: Booking):
    """Send booking notification email via EmailJS REST API"""
    try:
        submitted_at = booking.created_at.strftime('%Y-%m-%d %H:%M UTC')

        template_params = {
            "to_email": BOOKING_EMAIL,
            "name": booking.name,
            "email": booking.email or "Not provided",
            "phone": booking.phone,
            "date": booking.date,
            "boat": booking.boatName or booking.boat,
            "guests": booking.guestCount,
            "event_type": booking.eventType,
            "package": booking.packageType or "Not selected",
            "message": booking.message or "None",
            "status": booking.status,
            "submitted_at": submitted_at,
            "booking_id": booking.id,
        }

        payload = {
            "service_id": EMAILJS_SERVICE_ID,
            "template_id": EMAILJS_TEMPLATE_ID,
            "user_id": EMAILJS_PUBLIC_KEY,
            "template_params": template_params,
        }
        if EMAILJS_PRIVATE_KEY:
            payload["accessToken"] = EMAILJS_PRIVATE_KEY

        headers = {
            "Content-Type": "application/json",
            "origin": "http://localhost",
        }

        response = requests.post(
            EMAILJS_ENDPOINT,
            json=payload,
            headers=headers,
            timeout=15,
        )

        if response.status_code == 200:
            logger.info(f"EmailJS sent booking {booking.id} to {BOOKING_EMAIL}")
            return True

        logger.error(
            f"EmailJS failed for booking {booking.id} - status {response.status_code}: {response.text}"
        )
        return False
    except Exception as e:
        logger.error(f"Failed to send email via EmailJS for booking {booking.id}: {e}")
        return False


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Booking Routes
@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate, background_tasks: BackgroundTasks):
    """Create a new booking and send email notification"""
    try:
        # Create booking object
        booking = Booking(**booking_data.model_dump())
        
        # Convert to dict for MongoDB
        doc = booking.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Save to database
        await db.bookings.insert_one(doc)
        
        # Send email notification in background
        background_tasks.add_task(send_booking_email, booking)
        
        logger.info(f"New booking created: {booking.id}")
        return booking
        
    except Exception as e:
        logger.error(f"Failed to create booking: {e}")
        raise HTTPException(status_code=500, detail="Failed to process booking")


@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    """Get all bookings"""
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    
    for booking in bookings:
        if isinstance(booking.get('created_at'), str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return bookings


@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    """Get a specific booking by ID"""
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if isinstance(booking.get('created_at'), str):
        booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return booking


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()