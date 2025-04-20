from flask import Blueprint, jsonify, request
from ..models.restaurant import Restaurant
from ..models import db

# Create API blueprint
api_bp = Blueprint('api', __name__)

# Restaurant endpoints
@api_bp.route('/restaurants', methods=['GET'])
def get_restaurants():
    """Get all restaurants"""
    try:
        restaurants = Restaurant.get_all()
        return jsonify({
            'success': True,
            'data': [restaurant.to_dict() for restaurant in restaurants]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@api_bp.route('/restaurants/<int:id>', methods=['GET'])
def get_restaurant(id):
    """Get a restaurant by ID"""
    restaurant = Restaurant.get_by_id(id)
    if not restaurant:
        return jsonify({
            'success': False,
            'message': 'Restaurant not found'
        }), 404
    
    return jsonify({
        'success': True,
        'data': restaurant.to_dict()
    }), 200

@api_bp.route('/restaurants', methods=['POST'])
def create_restaurant():
    """Create a new restaurant"""
    data = request.get_json()
    
    if not data or 'name' not in data:
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
    
    return jsonify({
        'success': True,
        'message': 'Restaurant created successfully',
        'data': restaurant.to_dict()
    }), 201

@api_bp.route('/restaurants/<int:id>', methods=['PUT'])
def update_restaurant(id):
    """Update a restaurant"""
    restaurant = Restaurant.get_by_id(id)
    if not restaurant:
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
    
    return jsonify({
        'success': True,
        'message': 'Restaurant updated successfully',
        'data': restaurant.to_dict()
    }), 200

@api_bp.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    """Delete a restaurant"""
    restaurant = Restaurant.get_by_id(id)
    if not restaurant:
        return jsonify({
            'success': False,
            'message': 'Restaurant not found'
        }), 404
    
    restaurant.delete()
    
    return jsonify({
        'success': True,
        'message': 'Restaurant deleted successfully'
    }), 200