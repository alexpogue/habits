# from .habit_entry import habit_entry_blueprint
from .goal import goal_blueprint
# from .root_api import root_api_blueprint


def init_app(app):
    # app.register_blueprint(habit_entry_blueprint, url_prefix='/habit_entry')
    app.register_blueprint(goal_blueprint, url_prefix='/goal')
#    app.register_blueprint(
#        root_api_blueprint,
#        url_prefix='/',
#        template_folder='../templates',
#        static_folder='../static')
