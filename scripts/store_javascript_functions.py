"""
Created at 15/10/17
__author__ = 'Sergio Padilla'
"""
import sys
from argparse import ArgumentParser
from pymongo import MongoClient

FEQ = """
    function(property, lista) {
        if (Object.prototype.toString.call(property) == '[object Object]' ||
            Object.prototype.toString.call(lista) == '[object Object]')
            throw 'Object is not allowed'

        if (Object.prototype.toString.call(property) != Object.prototype.toString.call(lista))
            throw 'Incompatible types'

        if (Object.prototype.toString.call(lista) === '[object String]')
            return property == lista

        else if (Object.prototype.toString.call(lista) === '[object Array]') {
            if (lista.length > 1)
                throw 'Not supported yet, the second argument must be a crisp'

            if (property.length == 1)
                return property[0] == lista

            else if (property.length == 2)
                return property[0] <= lista && property[property.length - 1] >= lista
        }
    }
"""


def store_functions(database):
    """Add elements in database."""
    system = database.system_js
    system.feq = FEQ

    print("JavaScript functions stored in database")


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

    store_functions(database)


if __name__ == '__main__':
    """Run Script."""
    main()
