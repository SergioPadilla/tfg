"""
Created at 15/10/17
__author__ = 'Sergio Padilla'
"""
import sys
from argparse import ArgumentParser
from pymongo import MongoClient

FEQ = """
    function(property, value) {
        property = trapezoid(property);
        value = trapezoid(value);
        total = 0;

        if (property[2] >= value[1] && property[1] <= value[2])
            total = 1;

        else if (property[3] <= value[0] || property[0] >= value[3])
            total = 0;

        else if (property[3] > value[0] || property[2] < value[1])
            total = (property[3]-value[0]) / ((value[1]-value[0]) - (property[2]-property[3]));

        else
            total = (value[3]-property[0]) / ((property[1]-property[0]) - (value[2]-value[3]));

        return total
    }
"""

TO_TRAPEZOID = """
    function(x) {
        if (Object.prototype.toString.call(x) !== '[object Array]' &&
            Object.prototype.toString.call(x) !== '[object Number]')
            throw 'Incompatible type';

        if (Object.prototype.toString.call(x) === '[object Array]') {
            for (var i = 0; i < x.length; i++) {
                if (Object.prototype.toString.call(x[i]) !== '[object Number]')
                        throw 'Incompatible type';
            }
        }

        var v = x;
        if (Object.prototype.toString.call(x) === '[object Number]')
            v = [x];

        switch(v.length) {
            case 1:
                return [v[0], v[0], v[0], v[0]];
            case 2:
                return [v[0], v[0], v[1], v[1]];
            case 3:
                return [v[0], v[1], v[1], v[2]];
            case 4:
                return v.sort();
            default:
                throw 'Length must be smaller than 4';
        }
    }
"""


def store_functions(database):
    """Add elements in database."""
    system = database.system_js
    system.feq = FEQ
    system.trapezoid = TO_TRAPEZOID

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
