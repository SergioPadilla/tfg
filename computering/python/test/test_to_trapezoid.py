"""
Created at 15/10/17
__author__ = 'Sergio Padilla'
"""
import pytest
from pymongo import MongoClient
from pymongo.errors import OperationFailure

from scripts.store_javascript_functions import store_functions


@pytest.fixture
def collection():
    """Mongo db collection for testing."""
    mongo = MongoClient('localhost')
    database = mongo.test
    store_functions(database)
    return database['fuzzy']


@pytest.mark.parametrize('value', (
    {'k': 'v'},
    [1, "some string"],
    [{'k': 'v'}, "something"]
))
def test_incompatible_types(value, collection):
    """Test exceptions."""
    query = {'$where': 'trapezoid({})'.format(value)}
    print(query)

    #with pytest.raises(OperationFailure, message='Incompatible types'):
    response = collection.find_one(query)
    print(response)
    assert False


def test_incompatible_types_with_string(collection):
    """Test exceptions."""
    query = {'$where': 'trapezoid("some string")'}
    print(query)

    # with pytest.raises(OperationFailure, message='Incompatible types'):
    collection.find_one(query)
