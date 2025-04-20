from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name='development'):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Load configuration
    from .config import config
    app.config.from_object(config[config_name])
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Register error handlers
    from .middleware.error_handler import register_error_handlers
    register_error_handlers(app)
    
    # Register API routes/blueprints
    from .api.routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api/v1')
    
    # Route to verify app is running
    @app.route('/health')
    def health_check():
        return jsonify({'status': 'ok', 'message': 'Restaurant Management API is running'})
    
    @app.route('/')
    def index():
        return jsonify({'message': 'Welcome to Restaurant Management System API'})
    
    return app