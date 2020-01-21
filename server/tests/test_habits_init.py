import os
import tempfile

import pathmagic # noqa

import habits
from habits import create_app


def test_syslog_linux():
    """Test proper syslog dir on Linux"""
    syslog_path = habits.get_syslog_path_for_platform('linux')
    assert syslog_path == '/dev/log'


def test_syslog_darwin():
    """Test proper syslog dir on Mac"""
    syslog_path = habits.get_syslog_path_for_platform('darwin')
    assert syslog_path == '/var/run/syslog'


def test_config_file():
    """Test that config settings in config file take effect"""

    config_file_descriptor, config_file_name = tempfile.mkstemp()
    with open(config_file_name, 'w') as config_file:
        config_file.write('SQLALCHEMY_DATABASE_URI = \'sqlite:///:memory:\'\n')
        config_file.write('SQLALCHEMY_TRACK_MODIFICATIONS = False\n')

    os.close(config_file_descriptor)

    app = create_app(config_file=config_file_name)
    assert app.config['SQLALCHEMY_DATABASE_URI'] == 'sqlite:///:memory:'


def test_syslog_unknown():
    """Test unknown syslog returns None for syslog_path"""
    syslog_path = habits.get_syslog_path_for_platform('TempleOS')
    assert syslog_path is None
