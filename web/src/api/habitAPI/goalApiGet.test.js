'use strict';

jest.mock('./instance');

describe('fetchGoals', () => {
    const MOCKED_GOALS = [
        {'id': 1, 'name': 'Eat nachos'},
        {'id': 2, 'name': 'Do dishes'},
        {'id': 3, 'name': 'Do laundry'}
    ];

    beforeEach(() => {
        require('./instance').__setMockGoals(MOCKED_GOALS);
    });

    test('fetches all goals', done => {
        const goalApiGet = require('./goalApiGet');
        goalApiGet.getAllHabitGoals()
            .then(values => {
                expect(values).toEqual(MOCKED_GOALS);
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    test('fetches single goal', done => {
        const goalApiGet = require('./goalApiGet');
        debugger;
        goalApiGet.getHabitGoal(1)
            .then(value => {
                expect(value).toEqual(MOCKED_GOALS[0]);
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});
