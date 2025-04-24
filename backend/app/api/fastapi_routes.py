from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from sqlalchemy.orm import Session
from datetime import datetime
from contextlib import contextmanager

from ..models.restaurant import Restaurant
from .. import create_app, db

# Create a Flask app context for database operations
flask_app = create_app('development')

# Pydantic models for data validation
class RestaurantBase(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    description: Optional[str] = None

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantResponse(RestaurantBase):
    id: int
    created_at: datetime
    updated_at: datetime
    is_active: bool

    class Config:
        from_attributes = True  # Updated from orm_mode for newer Pydantic versions

# FastAPI instance
app = FastAPI(title="Restaurant API", description="FastAPI Restaurant Management System")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Context manager for Flask app context
@contextmanager
def get_db():
    with flask_app.app_context():
        try:
            yield db.session
        finally:
            db.session.close()

# Restaurant endpoints
@app.get("/api/restaurants", response_model=List[RestaurantResponse], status_code=status.HTTP_200_OK)
def get_restaurants():
    """Get all restaurants"""
    try:
        with flask_app.app_context():
            restaurants = Restaurant.get_all()
            return restaurants
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/restaurants/{restaurant_id}", response_model=RestaurantResponse, status_code=status.HTTP_200_OK)
def get_restaurant(restaurant_id: int):
    """Get a restaurant by ID"""
    with flask_app.app_context():
        restaurant = Restaurant.get_by_id(restaurant_id)
        if not restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        return restaurant

@app.post("/api/restaurants", response_model=RestaurantResponse, status_code=status.HTTP_201_CREATED)
def create_restaurant(restaurant: RestaurantCreate):
    """Create a new restaurant"""
    with flask_app.app_context():
        db_restaurant = Restaurant(
            name=restaurant.name,
            address=restaurant.address,
            phone=restaurant.phone,
            email=restaurant.email,
            description=restaurant.description
        )
        db_restaurant.save()
        return db_restaurant

@app.put("/api/restaurants/{restaurant_id}", response_model=RestaurantResponse, status_code=status.HTTP_200_OK)
def update_restaurant(restaurant_id: int, restaurant: RestaurantBase):
    """Update a restaurant"""
    with flask_app.app_context():
        db_restaurant = Restaurant.get_by_id(restaurant_id)
        if not db_restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        
        # Update restaurant attributes
        db_restaurant.name = restaurant.name
        if restaurant.address is not None:
            db_restaurant.address = restaurant.address
        if restaurant.phone is not None:
            db_restaurant.phone = restaurant.phone
        if restaurant.email is not None:
            db_restaurant.email = restaurant.email
        if restaurant.description is not None:
            db_restaurant.description = restaurant.description
        
        db_restaurant.save()
        return db_restaurant

@app.delete("/api/restaurants/{restaurant_id}", status_code=status.HTTP_200_OK)
def delete_restaurant(restaurant_id: int):
    """Delete a restaurant"""
    with flask_app.app_context():
        restaurant = Restaurant.get_by_id(restaurant_id)
        if not restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")
        
        restaurant.delete()
        return {"message": "Restaurant deleted successfully"}

# Add a health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "FastAPI Restaurant Management API is running"}