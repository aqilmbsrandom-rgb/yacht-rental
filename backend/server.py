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
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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
BOOKING_EMAIL = "aqilmbsrandom@gmail.com"

def send_booking_email(booking: Booking):
    """Send booking notification email"""
    try:
        # Create email content
        subject = f"New Booking Request - {booking.eventType} on {booking.date}"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #4a9494; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; background: #f6f5e8; }}
                .detail-row {{ margin: 10px 0; padding: 10px; background: white; }}
                .label {{ font-weight: bold; color: #4a9494; }}
                .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>⚓ Classy Boat</h1>
                    <h2>New Booking Request</h2>
                </div>
                <div class="content">
                    <div class="detail-row">
                        <span class="label">Customer Name:</span> {booking.name}
                    </div>
                    <div class="detail-row">
                        <span class="label">Phone:</span> {booking.phone}
                    </div>
                    <div class="detail-row">
                        <span class="label">Email:</span> {booking.email or 'Not provided'}
                    </div>
                    <div class="detail-row">
                        <span class="label">Preferred Date:</span> {booking.date}
                    </div>
                    <div class="detail-row">
                        <span class="label">Selected Boat:</span> {booking.boatName or booking.boat}
                    </div>
                    <div class="detail-row">
                        <span class="label">Package:</span> {booking.packageType or 'Not selected'}
                    </div>
                    <div class="detail-row">
                        <span class="label">Number of Guests:</span> {booking.guestCount}
                    </div>
                    <div class="detail-row">
                        <span class="label">Event Type:</span> {booking.eventType}
                    </div>
                    <div class="detail-row">
                        <span class="label">Special Requests:</span> {booking.message or 'None'}
                    </div>
                </div>
                <div class="footer">
                    <p>Booking ID: {booking.id}</p>
                    <p>Received at: {booking.created_at.strftime('%Y-%m-%d %H:%M UTC')}</p>
                    <p>Please contact the customer to confirm the booking.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Log the booking details (email sending would require SMTP setup)
        logger.info(f"Booking notification for: {BOOKING_EMAIL}")
        logger.info(f"Subject: {subject}")
        logger.info(f"Booking details: {booking.model_dump()}")
        
        # Note: For production, configure SMTP settings in .env
        # smtp_host = os.environ.get('SMTP_HOST')
        # smtp_port = os.environ.get('SMTP_PORT')
        # smtp_user = os.environ.get('SMTP_USER')
        # smtp_password = os.environ.get('SMTP_PASSWORD')
        
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
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