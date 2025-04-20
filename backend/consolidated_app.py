import os
import logging
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler("app.log"), logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Create Flask app
app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///restaurant.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'restaurant-management-system-key'

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Base model class
class Base(db.Model):
    """Base model class that includes common columns and methods"""
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
        
    def save(self):
        """Save the current record to the database"""
        db.session.add(self)
        db.session.commit()
        return self
        
    def delete(self):
        """Soft delete a record by setting is_active to False"""
        self.is_active = False
        return self.save()
        
    def hard_delete(self):
        """Hard delete a record from the database"""
        db.session.delete(self)
        db.session.commit()
        
    def to_dict(self):
        """Convert model to dictionary"""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

# Restaurant model
class Restaurant(Base):
    """Restaurant model representing restaurant entity"""
    __tablename__ = 'restaurants'
    
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    
    def __init__(self, name, address=None, phone=None, email=None, description=None):
        self.name = name
        self.address = address
        self.phone = phone
        self.email = email
        self.description = description
    
    def __repr__(self):
        return f'<Restaurant {self.name}>'

# User model
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

# API Routes
@app.route('/')
def index():
    logger.info("Index route accessed")
    return jsonify({'message': 'Welcome to Restaurant Management System API'})

@app.route('/health')
def health_check():
    logger.info("Health check route accessed")
    return jsonify({'status': 'ok', 'message': 'Restaurant Management API is running'})

# Restaurant endpoints
@app.route('/api/v1/restaurants', methods=['GET'])
def get_restaurants():
    """Get all restaurants"""
    try:
        logger.info("Getting all restaurants")
        restaurants = Restaurant.query.filter_by(is_active=True).all()
        return jsonify({
            'success': True,
            'data': [restaurant.to_dict() for restaurant in restaurants]
        }), 200
    except Exception as e:
        logger.error(f"Error getting restaurants: {str(e)}")
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/v1/restaurants/<int:id>', methods=['GET'])
def get_restaurant(id):
    """Get a restaurant by ID"""
    logger.info(f"Getting restaurant with ID: {id}")
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        logger.warning(f"Restaurant with ID {id} not found")
        return jsonify({
            'success': False,
            'message': 'Restaurant not found'
        }), 404
    
    return jsonify({
        'success': True,
        'data': restaurant.to_dict()
    }), 200

@app.route('/api/v1/restaurants', methods=['POST'])
def create_restaurant():
    """Create a new restaurant"""
    data = request.get_json()
    logger.info(f"Creating new restaurant with data: {data}")
    
    if not data or 'name' not in data:
        logger.warning("Invalid restaurant data: missing name")
        return jsonify({
            'success': False,
            'message': 'Name is required'
        }), 400
    
    restaurant = Restaurant(
        name=data['name'],
        address=data.get('address'),
        phone=data.get('phone'),
        email=data.get('email'),
        description=data.get('description')
    )
    
    restaurant.save()
    logger.info(f"Restaurant created with ID: {restaurant.id}")
    
    return jsonify({
        'success': True,
        'message': 'Restaurant created successfully',
        'data': restaurant.to_dict()
    }), 201

@app.route('/api/v1/restaurants/<int:id>', methods=['PUT'])
def update_restaurant(id):
    """Update a restaurant"""
    logger.info(f"Updating restaurant with ID: {id}")
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        logger.warning(f"Restaurant with ID {id} not found for update")
        return jsonify({
            'success': False,
            'message': 'Restaurant not found'
        }), 404
    
    data = request.get_json()
    
    if 'name' in data:
        restaurant.name = data['name']
    if 'address' in data:
        restaurant.address = data['address']
    if 'phone' in data:
        restaurant.phone = data['phone']
    if 'email' in data:
        restaurant.email = data['email']
    if 'description' in data:
        restaurant.description = data['description']
    
    restaurant.save()
    logger.info(f"Restaurant with ID {id} updated successfully")
    
    return jsonify({
        'success': True,
        'message': 'Restaurant updated successfully',
        'data': restaurant.to_dict()
    }), 200

@app.route('/api/v1/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    """Delete a restaurant"""
    logger.info(f"Deleting restaurant with ID: {id}")
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        logger.warning(f"Restaurant with ID {id} not found for deletion")
        return jsonify({
            'success': False,
            'message': 'Restaurant not found'
        }), 404
    
    restaurant.delete()
    logger.info(f"Restaurant with ID {id} deleted successfully")
    
    return jsonify({
        'success': True,
        'message': 'Restaurant deleted successfully'
    }), 200

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 Not Found errors"""
    logger.warning(f"404 error: {str(error)}")
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested resource was not found'
    }), 404

@app.errorhandler(500)
def internal_server_error(error):
    """Handle 500 Internal Server Error"""
    logger.error(f"500 error: {str(error)}")
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred'
    }), 500

# Initialize database
def init_db():
    """Initialize the database and add sample data"""
    with app.app_context():
        logger.info("Creating database tables")
        db.create_all()
        
        # Add a sample restaurant if none exists
        if Restaurant.query.count() == 0:
            logger.info("Adding sample restaurant")
            sample = Restaurant(
                name='Sample Restaurant',
                address='123 Main St',
                phone='555-123-4567',
                email='sample@restaurant.com',
                description='A sample restaurant for testing'
            )
            db.session.add(sample)
            db.session.commit()
            logger.info(f"Sample restaurant created with ID: {sample.id}")

# Initialize database
init_db()

# Run the application
if __name__ == '__main__':
    logger.info("Starting Flask application")
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=False, host='0.0.0.0', port=port)