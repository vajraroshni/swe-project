import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Create Flask app
app = Flask(__name__)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'simple-test-key'

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define a simple model
class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# Define routes
@app.route('/')
def index():
    return jsonify({'message': 'Restaurant API is running'})

@app.route('/api/restaurants')
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify({
        'success': True,
        'data': [r.to_dict() for r in restaurants]
    })

# Create database tables and run the app
with app.app_context():
    db.create_all()
    
    # Add sample data if no restaurants exist
    if Restaurant.query.count() == 0:
        sample = Restaurant(name='Sample Restaurant')
        db.session.add(sample)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True, port=8000)