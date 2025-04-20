import json
from datetime import datetime
from flask import jsonify
import re

def format_date(date):
    """Format datetime object to string"""
    if isinstance(date, datetime):
        return date.strftime('%Y-%m-%d %H:%M:%S')
    return None

def validate_email(email):
    """Validate email format"""
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None

def validate_phone(phone):
    """Validate phone number format"""
    # Simple validation - can be extended based on requirements
    phone_regex = r'^\+?[0-9]{10,15}$'
    return re.match(phone_regex, phone) is not None

def success_response(message=None, data=None, status_code=200):
    """Create a standardized success response"""
    response = {'success': True}
    if message:
        response['message'] = message
    if data is not None:
        response['data'] = data
    return jsonify(response), status_code

def error_response(message, status_code=400):
    """Create a standardized error response"""
    return jsonify({
        'success': False,
        'message': message
    }), status_code