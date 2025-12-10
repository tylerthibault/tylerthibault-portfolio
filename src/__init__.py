from flask import Flask


def create_app():
    app = Flask(__name__)

    init_blueprints(app)

    return app



def init_blueprints(app):
    from src.controllers.routes import main_bp
    app.register_blueprint(main_bp)
    return app