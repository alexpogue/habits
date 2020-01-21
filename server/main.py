import habits
import os

test_config = {
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'SQLALCHEMY_DATABASE_URI': 'sqlite:///habits.db'
}

app = habits.create_app('config.py')

if __name__ == '__main__':
    # Google AppEngine sets PORT env var to say which port to run on
    PORT = os.environ.get('PORT')
    if PORT is not None:
        app.run(host='0.0.0.0', port=PORT)
    else:
        app.run(host='0.0.0.0')
