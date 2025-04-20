import os
from waitress import serve
from consolidated_app import app

print("Starting Restaurant Management API in PRODUCTION mode...")
print("Serving on http://localhost:8000")
serve(app, host='0.0.0.0', port=8000)