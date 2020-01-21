# from .habit_entry import habit_entry_blueprint
from .habit_goal import habit_goal_blueprint
# from .root_api import root_api_blueprint


def init_app(app):
    # app.register_blueprint(habit_entry_blueprint, url_prefix='/habit_entry')
    app.register_blueprint(habit_goal_blueprint, url_prefix='/habit_goal')
#    app.register_blueprint(
#        root_api_blueprint,
#        url_prefix='/',
#        template_folder='../templates',
#        static_folder='../static')
