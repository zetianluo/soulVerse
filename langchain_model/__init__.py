# __init__.py
from flask import Flask

def create_app():
    app = Flask(__name__)

    # Register blueprints
    from .views import main
    app.register_blueprint(main)

    return app
