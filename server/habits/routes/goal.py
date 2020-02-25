from flask import Blueprint, request, abort, jsonify
from flask_cors import CORS
from ..models.goal import Goal
from ..models.goal import goals_schema, goal_schema
from ..models.base import db
from .util import get_by_id, ensure_json_or_die

goal_blueprint = Blueprint('goal_blueprint', __name__)
CORS(goal_blueprint)

@goal_blueprint.route('/')
def list_goal():
    all_goals = Goal.query.all()
    return jsonify({'data': goals_schema.dump(all_goals)})
 

@goal_blueprint.route('/<int:goal_id>')
def get_goal(goal_id):
    goal = get_by_id(Goal, goal_id, goal_schema)
    return jsonify({'data': goal})


@goal_blueprint.route('/', methods=['POST'])
def new_goal():
    ensure_json_or_die()
    request_data = request.get_json()

    goal_name = request_data['name']
    goal = Goal(name=goal_name)

    db.session.add(goal)
    db.session.commit()
    return jsonify({'data': 'success'})


@goal_blueprint.route('/<int:goal_id>', methods=['PUT'])
def update_goal(goal_id):
    ensure_json_or_die()
    request_data = request.get_json()

    goal = Goal.query.get(goal_id)
    if goal is None:
        abort(404)

    new_name = request_data.get('name')
    if new_name is not None:
        goal.name = new_name

    db.session.commit()
    return jsonify({'data': 'success'})


@goal_blueprint.route('/<int:goal_id>', methods=['DELETE'])
def delete_goal(goal_id):
    goal = Goal.query.get(goal_id)
    if goal is None:
        abort(404)

    db.session.delete(goal)
    db.session.commit()
    return jsonify({'data': 'success'})
