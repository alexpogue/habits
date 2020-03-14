'use strict';

import habit from './instance';

jest.mock('./instance');

describe('fetchAllGoals', () => {
    const MOCKED_GOALS = [
        {'id': 1, 'name': 'Eat nachos'},
        {'id': 2, 'name': 'Do dishes'},
        {'id': 3, 'name': 'Do laundry'}
    ];

    beforeEach(() => {
        require('./instance').__setMockGoals(MOCKED_GOALS);
    });

    test('fetches all goals', () => {
        const goalApiGet = require('./goalApiGet');
        goalApiGet.getAllHabitGoals()
            .then(values => {
                expect(values).toEqual(MOCKED_GOALS);
            });
    });
});
