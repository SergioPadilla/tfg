// Execute this example directly in a mongo shell.
// To execute, write in terminal:
//      mongo <mongo_server>:<port>/<database> path_to_this_script
//
// Example:
//      mongo localhost:27017/fuzzy mongo-shell-scripts/load_example.js


var casa = {
    'tipo': 'casa',
    'precio': [100000, 125000, 150000],
    'habitaciones': 3,
    'superficie': [90, 100, 110]
};

var piso = {
    'tipo': 'piso',
    'precio': [80000, 90000],
    'habitaciones': 2,
    'superficie': [75, 85]
};

var apartamento = {
    'tipo': 'apartamento',
    'precio': [65000, 75000],
    'habitaciones': 1,
    'superficie': [50, 65]
};

var chalet = {
    'tipo': 'chalet',
    'precio': [140000, 150000, 160000],
    'habitaciones': 3,
    'superficie': [100, 110, 120]
};

db.viviendas.insertMany([casa, piso, apartamento, chalet]);

print('Insertados ejemplos en la colección: viviendas');