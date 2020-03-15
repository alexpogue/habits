'use strict';

const instance = jest.genMockFromModule('axios');

let mockGoals = Object.create(null);
function __setMockGoals(newMockGoals) {
    mockGoals = newMockGoals;
}

function isNumeric(possibleNum) {
    return !isNaN(possibleNum);
}

function get(path) {
    if (path === 'goal/') {
        return Promise.resolve({'data': {'data': mockGoals}});
    }
    let pathSplit = path.split('/');
    if (pathSplit[0] === 'goal' && isNumeric(pathSplit[1])) {
        let goalNum = parseInt(pathSplit[1]);
        return Promise.resolve({'data': {'data': mockGoals[goalNum - 1]}});
    }
}

instance.__setMockGoals = __setMockGoals;
instance.get = get;

module.exports = instance;
