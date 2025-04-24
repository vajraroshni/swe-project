import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

if __name__ == "__main__":
    # Get port from environment or use default
    port = int(os.environ.get("PORT", 8000))
    
    # Run the FastAPI application with uvicorn
    uvicorn.run(
        "app.api.fastapi_routes:app", 
        host="0.0.0.0", 
        port=port,
        reload=True
    )