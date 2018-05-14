"""
Created at 15/10/17
__author__ = 'Sergio Padilla'
"""
import pytest
from pymongo import MongoClient
from pymongo.errors import OperationFailure

from scripts.store_javascript_functions import store_functions


CASA = {
    'tipo': 'casa',
    'precio': [100000, 125000, 150000],
    'habitaciones': 3
}

PISO = {
    'tipo': 'piso',
    'precio': [80000, 90000],
    'habitaciones': 2
}

APARTAMENTO = {
    'tipo': 'apartamento',
    'precio': [65000, 75000],
    'habitaciones': 1
}


def init_db(collection):
    """Add elements in database."""
    collection.insert_one(CASA)
    collection.insert_one(PISO)
    collection.insert_one(APARTAMENTO)


def clean_database(collection):
    """Add elements in database."""
    collection.drop()


@pytest.fixture
def collection():
    """Mongo db collection for testing."""
    mongo = MongoClient('localhost')
    database = mongo.test
    store_functions(database)
    collection = database['fuzzy']
    init_db(collection)
    return collection


@pytest.mark.parametrize('property, value', (
    ('some string', [1, 2]),
    ('some string', 1),
    ('some string', 1.1),

    (['some', 'array'], "some string"),
    (['some', 'array'], 1),
    (['some', 'array'], 1.1),

    (1, "some string"),
    (1, [1, 2]),

    (1.1, "some string"),
    (1.1, [1, 2]),
))
def test_incompatible_types(property, value, collection):
    """Test crisp field with exception."""
    try:
        query = {'$where': 'feq(' + str(property) + ', ' + str(value) + ')'}

        with pytest.raises(OperationFailure, message='Incompatible types'):
            collection.find_one(query)

    finally:
        clean_database(collection)


@pytest.mark.parametrize('property, value', (
    ({'key': 'value'}, 'something'),
    ('something', {'key': 'value'}),
    ({'key': 'value'}, {'key': 'value'})
))
def test_object_not_allowed(property, value, collection):
    """Test crisp field with exception."""
    try:
        query = {'$where': 'feq(' + str(property) + ', ' + str(value) + ')'}

        with pytest.raises(OperationFailure, message='Object is not allowed'):
            collection.find_one(query)

    finally:
        clean_database(collection)


def test_crisp_exception(collection):
    """Test crisp field with exception."""
    try:
        query = {'$where': 'feq(this.precio, [1,2])'}

        with pytest.raises(OperationFailure, message='Not supported yet, the second argument must be a crisp'):
            collection.find_one(query)

    finally:
        clean_database(collection)


def test_crisp(collection):
    """Test crisp field."""
    try:
        query = {'$where': 'feq(this.tipo, "apartamento")'}

        result = collection.find_one(query)

        assert result == APARTAMENTO

    finally:
        clean_database(collection)
