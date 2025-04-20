import os
from dotenv import load_dotenv
from app import create_app, db

# Load environment variables
load_dotenv()

# Determine which configuration to use
config_name = os.environ.get('FLASK_ENV', 'development')

# Create the Flask application instance
app = create_app(config_name)

# Create a function to initialize the database
def init_db():
    with app.app_context():
        db.create_all()

# Initialize database
init_db()

if __name__ == '__main__':
    # Run the application
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 8000))
    debug = True   # Set to False in production
    
    app.run(host=host, port=port, debug=debug)