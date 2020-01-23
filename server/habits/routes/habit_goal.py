from flask import Blueprint, request, abort, jsonify
from ..models.habit_goal import HabitGoal
from ..models.habit_goal import habit_goals_schema, habit_goal_schema
from ..models.base import db
from .util import get_by_id, ensure_json_or_die

habit_goal_blueprint = Blueprint('habit_goal_blueprint', __name__)


@habit_goal_blueprint.route('/')
def list_habit_goal():
    all_habit_goals = HabitGoal.query.all()
    return jsonify({'data': habit_goals_schema.dump(all_habit_goals)})


@habit_goal_blueprint.route('/<int:habit_goal_id>')
def get_habit_goal(habit_goal_id):
    habit_goal = get_by_id(HabitGoal, habit_goal_id, habit_goal_schema)
    return jsonify({'data': habit_goal})


@habit_goal_blueprint.route('/', methods=['POST'])
def new_habit_goal():
    ensure_json_or_die()
    request_data = request.get_json()

    habit_goal_name = request_data['name']
    habit_goal = HabitGoal(name=habit_goal_name)

    db.session.add(habit_goal)
    db.session.commit()
    return jsonify({'data': 'success'})


@habit_goal_blueprint.route('/<int:habit_goal_id>', methods=['PUT'])
def update_habit_goal(habit_goal_id):
    ensure_json_or_die()
    request_data = request.get_json()

    habit_goal = HabitGoal.query.get(habit_goal_id)
    if habit_goal is None:
        abort(404)

    new_name = request_data.get('name')
    if new_name is not None:
        habit_goal.name = new_name

    db.session.commit()
    return jsonify({'data': 'success'})


@habit_goal_blueprint.route('/<int:habit_goal_id>', methods=['DELETE'])
def delete_habit_goal(habit_goal_id):
    habit_goal = HabitGoal.query.get(habit_goal_id)
    if habit_goal is None:
        abort(404)

    db.session.delete(habit_goal)
    db.session.commit()
    return jsonify({'data': 'success'})
