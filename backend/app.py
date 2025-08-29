from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///charity.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize db and migration with app
    db.init_app(app)
    jwt.init_app(app) 
    migrate.init_app(app, db)

    # Import models so Flask-Migrate knows them
    from models import User, Program, Donation, Volunteer

    # Import routes (blueprints)
    from routes.user_routes import users_bp
    from routes.volunteer_routes import volunteers_bp
    from routes.program_route import programs_bp
    from routes.donation_routes import donations_bp

    # Register blueprints
    app.register_blueprint(users_bp)
    app.register_blueprint(volunteers_bp)
    app.register_blueprint(programs_bp)
    app.register_blueprint(donations_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
