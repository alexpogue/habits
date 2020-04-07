from flask import Blueprint, request, abort, jsonify
from flask_cors import CORS
from ..models.goal_entry import GoalEntry
from ..models.goal_entry import goal_entries_schema, goal_entry_schema
from ..models.goal import Goal

from ..models.base import db
from .util import get_by_id, ensure_json_or_die

from datetime import datetime

goal_entry_blueprint = Blueprint('goal_entry_blueprint', __name__)
# Allows CORS on all goal_entry_blueprint routes
CORS(goal_entry_blueprint)


@goal_entry_blueprint.route('/')
def list_goal_entry():
    all_goals = GoalEntry.query.all()
    return jsonify({'data': goal_entries_schema.dump(all_goals)})


@goal_entry_blueprint.route('/<int:goal_entry_id>')
def get_goal_entry(goal_entry_id):
    goal_entry = get_by_id(GoalEntry, goal_entry_id, goal_entry_schema)
    return jsonify({'data': goal_entry})


@goal_entry_blueprint.route('/', methods=['POST'])
def new_goal_entry():
    ensure_json_or_die()
    request_data = request.get_json()

    goal_id = request_data['goal']
    occurred_date_str = request_data['occurred_date']

    occurred_date = datetime.strptime(occurred_date_str, '%Y-%m-%d').date()

    goal_entry = GoalEntry(goal_id=goal_id, occurred_date=occurred_date)

    goal = Goal.query.get(goal_id)
    if goal is None:
        abort(404)

    goal.entries.append(goal_entry)

    db.session.add(goal_entry)
    db.session.commit()
    return jsonify({'data': 'success'})


@goal_entry_blueprint.route('/<int:goal_entry_id>', methods=['PUT'])
def update_goal_entry(goal_entry_id):
    ensure_json_or_die()
    request_data = request.get_json()

    goal_entry = GoalEntry.query.get(goal_entry_id)
    if goal_entry is None:
        abort(404)

    occurred_date_str = request_data.get('occurred_date')
    new_occurred_date = datetime.strptime(occurred_date_str, '%Y-%m-%d').date()

    if new_occurred_date is not None:
        goal_entry.occurred_date = new_occurred_date

    db.session.commit()
    return jsonify({'data': 'success'})


@goal_entry_blueprint.route('/<int:goal_entry_id>', methods=['DELETE'])
def delete_goal_entry(goal_entry_id):
    goal_entry = GoalEntry.query.get(goal_entry_id)
    if goal_entry is None:
        abort(404)

    db.session.delete(goal_entry)
    db.session.commit()
    return jsonify({'data': 'success'})
