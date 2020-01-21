![build status](https://api.travis-ci.org/alexpogue/habits.svg?branch=master)
![codecov](https://codecov.io/gh/alexpogue/habits/branch/master/graph/badge.svg)
![MIT-licensed](https://img.shields.io/github/license/alexpogue/habits)

# Habits

Habits is a habit tracker. Add your habit goals and enter habit entries for
every day that you complete the habit.

# Server

### Running tests

1. `cd server`
2. `pipenv shell`
3. `pipenv install --dev`
4. `pytest --cov-report term-missing --cov=habits tests/`

### Running flake8

1. `cd server`
2. `pipenv shell`
3. `pipenv install --dev`
4. `flake8`

### Running server

1. `cd server`
2. `pipenv shell`
3. `pipenv install`
4. `python main.py`

### Contributing

Ensure 100% test code coverage and no flake8 errors before pushing code to
master.
