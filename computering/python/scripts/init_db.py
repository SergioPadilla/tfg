"""
Created at 15/10/17
__author__ = 'Sergio Padilla'
"""
import sys
from argparse import ArgumentParser
from pymongo import MongoClient


def init_db(collection):
    """Add elements in database."""
    casa = {
        'tipo': 'casa',
        'precio': [100000, 125000, 150000],
        'habitaciones': 3
    }

    piso = {
        'tipo': 'piso',
        'precio': [80000, 90000],
        'habitaciones': 2
    }

    apartamento = {
        'tipo': 'apartamento',
        'precio': [65000, 75000],
        'habitaciones': 1
    }

    collection.insert_one(casa)
    collection.insert_one(piso)
    collection.insert_one(apartamento)

    print("Database initialized correctly")


def main():
    """Parse arguments and execute the script."""
    parser = ArgumentParser(description='Init Database')

    parser.add_argument('-u', '--uri', help='Database uri', default='mongodb://localhost/fuzzy')

    args = parser.parse_args(sys.argv[1:])

    mongo = MongoClient(args.uri)
    try:
        database = mongo.get_database()

    except:
        database = mongo.fuzzy

    collection = database['test']

    init_db(collection)


if __name__ == '__main__':
    """Run Script."""
    main()
