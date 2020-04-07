from .goal import goal_blueprint
from .goal_entry import goal_entry_blueprint


def init_app(app):
    app.register_blueprint(goal_blueprint, url_prefix='/goal')
    app.register_blueprint(goal_entry_blueprint, url_prefix='/goal_entry')
