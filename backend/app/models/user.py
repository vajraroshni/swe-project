from ..models import db
from .base import Base
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(Base):
    """Base User model that will be extended by specific user types"""
    __tablename__ = 'users'
    
    # Discriminator column for inheritance
    type = db.Column(db.String(50))
    
    # User attributes
    username = db.Column(db.String(64), unique=True, index=True, nullable=False)
    email = db.Column(db.String(120), unique=True, index=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    is_active = db.Column(db.Boolean, default=True)
    last_login = db.Column(db.DateTime, default=None)
    
    # Foreign key relationship to Restaurant
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    
    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': type
    }
    
    def __init__(self, username, email, password, first_name=None, last_name=None, restaurant_id=None):
        self.username = username
        self.email = email
        self.set_password(password)
        self.first_name = first_name
        self.last_name = last_name
        self.restaurant_id = restaurant_id
    
    def set_password(self, password):
        """Hash and set the password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Verify the password against its hash"""
        return check_password_hash(self.password_hash, password)
    
    def update_last_login(self):
        """Update last login timestamp"""
        self.last_login = datetime.utcnow()
        self.save()
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def to_dict(self):
        """Convert user to dictionary excluding password hash"""
        data = super().to_dict()
        data.pop('password_hash', None)
        return data