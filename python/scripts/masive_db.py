"""
Created at 10/12/17
__author__ = 'Sergio Padilla'
"""
from pymongo import MongoClient


def main():
    """Parse arguments and execute the script."""
    mongo = MongoClient('mongodb://localhost/fuzzy')
    collection = mongo.get_default_database().viviendas

    for _ in range(2):
        for doc in collection.find():
            del doc['_id']
            inserted_id = collection.insert_one(doc).inserted_id
            print('inserted: ' + str(inserted_id))


if __name__ == '__main__':
    """Run Script."""
    main()
