def assert_200_json_response(return_value, expected_json):
    assert return_value.status_code == 200
    assert return_value.is_json
    assert return_value.get_json() == expected_json
