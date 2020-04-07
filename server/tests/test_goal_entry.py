import os
import tempfile
import pytest
from helpers import assert_200_json_response

import pathmagic # noqa

from habits import create_app


@pytest.fixture
def client():
    db_file_descriptor, db_file_name = tempfile.mkstemp()
    pytest.path_to_goal = '/goal'
    pytest.path_to_goal_entry = '/goal_entry'

    test_config = {
        'SQLALCHEMY_TRACK_MODIFICATIONS': False,
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///{}'.format(db_file_name)
    }
    app = create_app(test_config=test_config)
    with app.test_client() as client:
        with app.app_context():
            yield client  # this is where the testing happens!

    os.close(db_file_descriptor)


@pytest.fixture
def one_goal_in_db_client(client):
    client.post('{}/'.format(pytest.path_to_goal), json={'name': 'goal1'})
    return client


@pytest.fixture
def one_goal_and_entry_in_db_client(one_goal_in_db_client):
    json_in = {'goal': 1, 'occurred_date': '2020-03-20'}
    one_goal_in_db_client.post(
        '{}/'.format(pytest.path_to_goal_entry), json=json_in
    )
    return one_goal_in_db_client


def test_non_json_post(client):
    rv = client.post('{}/'.format(pytest.path_to_goal_entry), data='not_json')
    assert rv.status_code == 415


def test_get_list_empty_db(client):
    """Test a blank database."""

    expected = {'data': []}
    rv = client.get('{}/'.format(pytest.path_to_goal_entry))
    assert_200_json_response(rv, expected)


def test_get_elem_empty_db_404(client):
    """Ensure getting element from an empty db gives a 404"""

    rv = client.get('{}/1'.format(pytest.path_to_goal_entry))
    assert rv.status_code == 404


def test_insert_into_empty_db(client):
    """Test inserting a goal entry into empty db that has no goals"""

    json_in = {'goal': 1, 'occurred_date': '2020-03-20'}
    rv = client.post('{}/'.format(pytest.path_to_goal_entry), json=json_in)
    assert rv.status_code == 404


def test_get_list_one_elem(one_goal_and_entry_in_db_client):
    """Test listing a database with one element"""

    expected = {
        'data': [{'id': 1, 'goal_id': 1, 'occurred_date': '2020-03-20'}]
    }
    rv = one_goal_and_entry_in_db_client.get(
        '{}/'.format(pytest.path_to_goal_entry)
    )

    expected = {
        'data': [{
            'id': 1,
            'name': 'goal1',
            'entries': [{'id': 1, 'occurred_date': '2020-03-20'}]
        }]
    }
    rv = one_goal_and_entry_in_db_client.get(
        '{}/'.format(pytest.path_to_goal)
    )
    assert_200_json_response(rv, expected)


def test_get_item_one_elem(one_goal_and_entry_in_db_client):
    """Test getting the one item of a db with one item"""

    expected = {'data': {'id': 1, 'goal_id': 1, 'occurred_date': '2020-03-20'}}

    rv = one_goal_and_entry_in_db_client.get(
        '{}/1'.format(pytest.path_to_goal_entry)
    )
    assert_200_json_response(rv, expected)


def test_get_item_out_of_bounds(one_goal_and_entry_in_db_client):
    """Ensure getting element 2 from db with one element gives a 404"""

    rv = one_goal_and_entry_in_db_client.get(
        '{}/2'.format(pytest.path_to_goal_entry)
    )
    assert rv.status_code == 404


def test_get_item_after_update(one_goal_and_entry_in_db_client):
    """Ensure update item actually updates the item"""

    expected_update_response = {'data': 'success'}
    json_in = {'occurred_date': '2020-03-19'}
    rv = one_goal_and_entry_in_db_client.put(
        '{}/1'.format(pytest.path_to_goal_entry), json=json_in
    )
    assert_200_json_response(rv, expected_update_response)

    expected_get_response = {
        'data': {'id': 1, 'goal_id': 1, 'occurred_date': '2020-03-19'}
    }
    rv = one_goal_and_entry_in_db_client.get(
        '{}/1'.format(pytest.path_to_goal_entry)
    )
    assert_200_json_response(rv, expected_get_response)


def test_update_elem_empty_db_404(client):
    """Ensure update element on an empty database gives 404"""

    rv = client.put(
        '{}/1'.format(pytest.path_to_goal_entry), json={'name': 'updated'}
    )
    assert rv.status_code == 404


def test_delete_elem_empty_db_404(client):
    """Ensure delete element on an empty database gives 404"""

    rv = client.delete('{}/1'.format(pytest.path_to_goal_entry))
    assert rv.status_code == 404


def test_list_item_after_delete(one_goal_and_entry_in_db_client):
    """Ensure deleting item actually deletes the item"""
    expected_delete_response = {'data': 'success'}
    rv = one_goal_and_entry_in_db_client.delete(
        '{}/1'.format(pytest.path_to_goal_entry)
    )
    assert_200_json_response(rv, expected_delete_response)

    expected_list_response = {'data': []}
    rv = one_goal_and_entry_in_db_client.get(
        '{}/'.format(pytest.path_to_goal_entry)
    )
    assert_200_json_response(rv, expected_list_response)
