from flask import Flask
from flask_cors import CORS
from extensions import db, ma, migrate, bcrypt
from routes import api_bp
from flask_jwt_extended import JWTManager
import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://chichi:cynthiachichi@localhost/study_group_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "your-secret-key" 

db.init_app(app)
ma.init_app(app)
migrate.init_app(app, db)
bcrypt.init_app(app)
jwt = JWTManager(app)
CORS(app, resources={r"/*":{"origins":"https://study-group-app.netlify.app"}}, supports_credentials=True)

app.register_blueprint(api_bp)
