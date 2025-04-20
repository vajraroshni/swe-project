from ..models import db
from .base import Base

class Restaurant(Base):
    """Restaurant model representing restaurant entity"""
    __tablename__ = 'restaurants'
    
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    
    # Define relationships to other models
    # These will be implemented by the other team members
    # users = db.relationship('User', backref='restaurant', lazy=True)
    # inventory = db.relationship('Inventory', backref='restaurant', lazy=True)
    
    def __init__(self, name, address=None, phone=None, email=None, description=None):
        self.name = name
        self.address = address
        self.phone = phone
        self.email = email
        self.description = description
    
    def __repr__(self):
        return f'<Restaurant {self.name}>'