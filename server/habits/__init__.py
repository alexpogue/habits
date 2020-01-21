from flask import Flask
import sys
import logging
from logging.handlers import SysLogHandler


def create_app(config_file=None, test_config=None):
    from . import models, routes
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_pyfile(config_file)
    else:
        app.config.update(test_config)

    init_logging_handlers(app)

    models.init_app(app)
    routes.init_app(app)
    return app


def init_logging_handlers(app):
    syslog_path = get_syslog_path_for_platform(sys.platform)
    syslog_handler = SysLogHandler(address=syslog_path)

    if syslog_handler is not None:
        syslog_handler.setLevel(logging.INFO)
        app.logger.addHandler(syslog_handler)

    stdout_handler = logging.StreamHandler(sys.stdout)
    stdout_handler.setLevel(logging.INFO)
    app.logger.addHandler(stdout_handler)

    app.logger.setLevel(logging.INFO)


def get_syslog_path_for_platform(platform):
    if platform == 'darwin':
        return '/var/run/syslog'
    elif platform == 'linux':
        return '/dev/log'
    else:
        return None
