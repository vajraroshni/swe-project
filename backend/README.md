# Restaurant Management System - Backend

Backend for Restaurant Management System

## Project Structure

```
backend/
├── app/
│   ├── __init__.py           # Flask app initialization
│   ├── config.py             # Configuration settings
│   ├── models/               # Database models
│   │   ├── __init__.py
│   │   ├── base.py           # Base model class
│   │   ├── restaurant.py     # Restaurant model
│   │   └── user.py           # User model
│   ├── api/                  # API endpoints
│   │   ├── __init__.py
│   │   └── routes.py         # Core API routes
│   ├── middleware/           # Middleware components
│   │   ├── __init__.py
│   │   └── error_handler.py  # Error handling middleware
│   └── utils/                # Utility functions
│       ├── __init__.py
│       └── helpers.py        # Helper functions
├── migrations/               # Database migrations
├── .env.example              # Example environment variables
└── run.py                    # Application entry point
```


### Prerequisites

- Python 3.8+
- pip
- Virtual env

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  #On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Edit `.env` file based on `.env.example`
6. Initialize the database:
   ```
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```
7. Run the application:
   ```
   python run.py
   ```

## API Endpoints

### Restaurant Endpoints

- GET `/api/v1/restaurants` - Get all restaurants
- GET `/api/v1/restaurants/<id>` - Get a restaurant by ID
- POST `/api/v1/restaurants` - Create a new restaurant
- PUT `/api/v1/restaurants/<id>` - Update a restaurant
- DELETE `/api/v1/restaurants/<id>` - Delete a restaurant


### Core Backend (Current Implementation)
- Project structure
- Core models (Restaurant, User base class)
- API conventions
- Error handling
- Database configuration

### Other Components:

#### User Management / Authentication Team
- Detailed user models and relationships
- Authentication and authorization
- User-related endpoints

#### Order / Billing / Reporting Team
- Order, OrderItem, Bill models and endpoints
- Order processing logic
- Billing functionality
- Report generation

#### Inventory / Purchase Orders Team
- Ingredient, Inventory, PurchaseOrder models and endpoints
- Inventory management logic
- Purchase order generation
- Supplier interactions