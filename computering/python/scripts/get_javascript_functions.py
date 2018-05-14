"""
Created at 15/10/17
__author__ = 'Sergio Padilla'
"""
import sys
from argparse import ArgumentParser
from pymongo import MongoClient


def get_javascript_functions(database):
    """Add elements in database."""
    system = database.system_js

    print("JavaScript functions stored in database: ")
    print(system.list())


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

    get_javascript_functions(database)


if __name__ == '__main__':
    """Run Script."""
    main()
