'use strict';

import nock from 'nock';
import { getHabitGoal, getAllHabitGoals, postHabitGoal } from "./goalApiGet";

describe('fetchGoals', () => {
    const MOCKED_GOALS = [
        {'id': 1, 'name': 'Eat nachos'},
        {'id': 2, 'name': 'Do dishes'},
        {'id': 3, 'name': 'Do laundry'}
    ];

    const MOCKED_NEW_GOAL = {'id': 4, 'name': 'Do a good deed'}

    const CORS_FIX_HEADERS = {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    };

    test('fetches all goals', done => {
        const scope = nock('http://localhost:5000')
            .get('/goal/')
            .reply(200, {'data': MOCKED_GOALS}, CORS_FIX_HEADERS);

        getAllHabitGoals()
            .then(values => {
                expect(values).toEqual(MOCKED_GOALS);
                scope.done();
                done();
            });
    });

    test('fetches single goal', done => {
        const scope = nock('http://localhost:5000')
            .get('/goal/1')
            .reply(200, {'data': MOCKED_GOALS[0]}, CORS_FIX_HEADERS);

        getHabitGoal(1)
            .then(value => {
                expect(value).toEqual(MOCKED_GOALS[0]);
                scope.done();
                done();
            });
    });

    test('post goal', done => {
        const scope = nock('http://localhost:5000')
            .post('/goal/')
            .reply(200, {'data': 'success'}, CORS_FIX_HEADERS);

        const NEW_GOALS_LIST = MOCKED_GOALS + MOCKED_NEW_GOAL;
        const scope2 = nock('http://localhost:5000')
            .get('/goal/')
            .reply(200, {'data': NEW_GOALS_LIST}, CORS_FIX_HEADERS);

        postHabitGoal(MOCKED_NEW_GOAL)
            .then(value => {
                expect(value).toEqual(NEW_GOALS_LIST);
                scope.done();
                scope2.done();
                done();
            });
    });



});
