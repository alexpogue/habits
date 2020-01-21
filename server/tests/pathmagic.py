# To get flake8 not to complain about imports not at top of file.
# see https://stackoverflow.com/a/36829884
import sys
import os

myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, myPath + '/../')
