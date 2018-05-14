"""
Created at 13/5/18
__author__ = 'Sergio Padilla'
"""
from pymongo import MongoClient

mongo = MongoClient('localhost')
system = mongo.test.system_js

cursor = system.fuzzy_find('Tab_25', {'trape': {'$fgt': [100000,110000,120000,130000], '$thold': 0.6}}, {})
print(cursor)
for i, doc in enumerate(cursor):
    print(i)
    print(len(cursor[doc]))
