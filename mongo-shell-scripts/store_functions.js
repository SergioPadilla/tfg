// Execute this example directly in a mongo shell.
// To execute, write in terminal:
//      mongo <mongo_server>:<port>/<database> path_to_this_script
//
// Example:
//      mongo localhost:27017/fuzzy mongo-shell-scripts/store_functions.js


var trapezoid = function(x) {
    if (Object.prototype.toString.call(x) !== '[object Array]' &&
        Object.prototype.toString.call(x) !== '[object Number]')
        throw 'Incompatible type: ' + x + ' ' + Object.prototype.toString.call(x);

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
};

var feq = function(property, value) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[2] >= value[1] && property[1] <= value[2])
        total = 1;

    else if (property[3] <= value[0] || property[0] >= value[3])
        total = 0;

    else if (property[3] > value[0] && property[2] < value[1])
        total = (property[3]-value[0]) / ((value[1]-value[0]) - (property[2]-property[3]));

    else {
        total = (value[3]-property[0]) / ((property[1]-property[0]) - (value[2]-value[3]));
    }

    return total
};

db.system.js.save({_id: 'trapezoid', value: trapezoid});
db.system.js.save({_id: 'feq', value: feq});

print('Funciones "trapezoid" y "feq" almacenadas correctamente.');