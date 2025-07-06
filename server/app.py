
# from flask import Flask
# from flask_cors import CORS
# # from server.extensions import db, ma, migrate, bcrypt
# # from server.routes import api_bp
# from flask_jwt_extended import JWTManager
# from dotenv import load_dotenv
# from pathlib import Path
# import os

# from extensions import db, ma, migrate, bcrypt
# from routes import api_bp
# load_dotenv(dotenv_path=Path(__file__).parent / '.env')
# print(os.getenv('DATABASE_URL'))

# class Config:
#     SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
#     SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret')
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret")

# def create_app():
#     app = Flask(__name__)

#     app.config.from_object(Config)
#     # app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
#     # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
#     # app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY") 

#     db.init_app(app)
#     ma.init_app(app)
#     migrate.init_app(app, db)
#     bcrypt.init_app(app)
#     jwt = JWTManager(app)
#     CORS(app, resources={r"/*":{"origins":"https://study-group-app.netlify.app/"}}, supports_credentials=True)

#     app.register_blueprint(api_bp, url_prefix='/api')

#     with app.app_context():
#         from flask_migrate import upgrade
#         upgrade()

#     # app.register_blueprint(api_bp)

#     return app

# app = create_app()


from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from pathlib import Path
import os

from extensions import db, ma, migrate, bcrypt
from routes import api_bp

load_dotenv(dotenv_path=Path(__file__).parent / '.env')
print(os.getenv('DATABASE_URL'))

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret")

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt = JWTManager(app)
    
    # CORS configuration
    CORS(app, resources={r"/*": {"origins": ["https://study-group-app.netlify.app", "https://study-group-app.netlify.app/"]}}, supports_credentials=True)

    app.register_blueprint(api_bp, url_prefix='/api')

    # Handle preflight requests
    @app.route('/api/<path:path>', methods=['OPTIONS'])
    def options(path):
        return '', 200

    with app.app_context():
        from flask_migrate import upgrade
        upgrade()

    return app

app = create_app()
