import json
from flask import Blueprint, redirect, url_for, render_template, flash
from ..models.user import User, user_schema, users_schema
from ..models.oauth import OAuth
from ..models.base import db
from flask_cors import CORS
from flask_login import LoginManager, login_user
from flask_dance.consumer import oauth_authorized, oauth_error
from flask_dance.contrib.facebook import make_facebook_blueprint, facebook
from flask_login import logout_user
from sqlalchemy.orm.exc import NoResultFound

user_blueprint = Blueprint('user_blueprint', __name__)
CORS(user_blueprint)

facebook_blueprint = make_facebook_blueprint(redirect_url='/user', scope='email')
login_manager = LoginManager()

def init_app(app):
    app.register_blueprint(facebook_blueprint, url_prefix='/login_fb')
    login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@oauth_authorized.connect_via(facebook_blueprint)
def facebook_logged_in(blueprint, token):
    if not token:
        flash('Failed to log in with Facebook', category='error')
        return False
    resp = blueprint.session.get('/me')
    if not resp.ok:
        msg = 'Failed to fetch user info from Facebook'
        flash(msg, category='error')
        return False

    facebook_info = resp.json()
    print('{}'.format(json.dumps(facebook_info, indent=4)))
    facebook_user_id = str(facebook_info['id'])

    query = OAuth.query.filter_by(
        provider=blueprint.name,
        provider_user_id=facebook_user_id
    )

    try:
        oauth = query.one()
    except NoResultFound:
        oauth = OAuth(
            provider=blueprint.name,
            provider_user_id=facebook_user_id,
            token=token
        )

    if oauth.user:
        login_user(oauth.user)
        flash('Successfully signed in with Facebook')
    else:
        email_resp = blueprint.session.get('/{}?fields=email'.format(facebook_user_id))
        if not email_resp.ok:
            msg = 'Failed to get user email from Facebook'
            flash(msg, category='error')
            return False

        facebook_email = email_resp.json()

        print('{}'.format(json.dumps(facebook_email, indent=4)))
        user = User(
            email=facebook_email['email'],
            name=facebook_info['name'],
            handle=facebook_info['id']
        )
        oauth.user = user
        db.session.add_all([user, oauth])
        db.session.commit()
        login_user(user)
        flash('Successfully signed in with Facebook')

    # Disable flask-dance's default behavior for saving the OAuth token
    return False

@oauth_error.connect_via(facebook_blueprint)
def facebook_error(blueprint, error, error_description=None, error_uri=None):
    msg = (
        'OAuth error from {name}!'
        'error={error} description={description} uri={uri}'
    ).format(
        name=blueprint.name,
        error=error,
        description=error_description,
        uri=error_uri
    )
    flash(msg, category='error')

@user_blueprint.route('/')
def auth_test():
    return render_template('auth_home.html')

@user_blueprint.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('user_blueprint.auth_test'))

@user_blueprint.route('/loggedout')
def logged_out_page():
    return "user has been logged out"
