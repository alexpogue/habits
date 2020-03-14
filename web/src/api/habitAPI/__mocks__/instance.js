'use strict';

const instance = jest.genMockFromModule('./instance');

let mockGoals = Object.create(null);
function __setMockGoals(newMockGoals) {
    mockGoals = newMockGoals;
}

function get(path) {
    if (path == 'goal/') {
        return Promise.resolve({'data': mockGoals});
    }
}

instance.__setMockGoals = __setMockGoals;
instance.get = get;

module.exports = instance;
