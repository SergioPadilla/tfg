"""
Created at 16/6/18
__author__ = 'Sergio Padilla'
"""
from pymongo import MongoClient

FIELDS = ['precio', 'superficie', 'habitaciones']


def fuzzy(value):
    value = sorted(value)
    size = len(value)

    if size == 1:
        return [value[0]] * 4

    elif size == 2:
        return [value[0]] * 2 + [value[1]] * 2

    elif size == 3:
        return [value[0], value[1], value[1], value[2]]

    else:
        return value


def main():
    """Parse arguments and execute the script."""
    db = MongoClient('mongodb://localhost:27017/test').get_database()

    for doc in db.viviendas.find({}):
        for field in FIELDS:
            doc[field] = fuzzy(doc[field])
            db.viviendas.update({'_id': doc['_id']}, {'$set': doc})

    print('finish')


if __name__ == '__main__':
    """Run Script."""
    main()
