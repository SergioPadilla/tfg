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

var feq = function(property, value, min=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[2] >= value[1] && property[1] <= value[2])
        total = 1;

    else if (property[3] <= value[0] || property[0] >= value[3])
        total = 0;

    else if (property[3] > value[0] && property[2] < value[1])
        total = (property[3]-value[0]) / ((value[1]-value[0]) - (property[2]-property[3]));

    else
        total = (value[3]-property[0]) / ((property[1]-property[0]) - (value[2]-value[3]));

    if (min !== null)
        return total >= min;

    else
        return total
};

var nfeq = function (property, value) {
    property = trapezoid(property);
    value = trapezoid(value);
    
    if ((property[1] <= value[0] && property[0] !== value[1]) || (property[2] >= value[3] && property[3] !== value[2]))  // No solapa en nucleo del primero no tienen pendiente inf.
        return 0;

	else if (property[0] < value[1]) // No tienen pediente infinita en la izquierda

        if (property[3] > value[2])  // Es p||sible calcular por la derecha
            return Math.min(
                (property[1] - value[0]) / ((value[1] - value[0]) - (property[0] - property[1])), // Por la izquierda
                (property[2] - value[3]) / ((value[2] - value[3]) - (property[3] - property[2]))  // Por la derecha
            );

        else  // Solo se puede calcular por la izquierda
            return (property[1] - value[0]) / ((value[1] - value[0]) - (property[0] - property[1]));

    else if (property[3] > value[2])  // No tienen pediente infinita en la derecha
        return (property[2] - value[3]) / ((value[2] - value[3]) - (property[3] - property[2]));  // Calculo por la derecha

    else
        return 1;  // Tienen pediente infinita por ambos lados (intervalos)
};

var fgt = function (property, value) {
    if (property[2] >= value[3])  // Se solapan los nucleos de las funciones
        return 1;

    else if (property[3] <= value[2])  // No se solapan los nucleos
        return 0;

    else
        return (property[3] - value[2]) / ((value[3] - value[2]) - (property[2] - property[3]))  // TODO: round 2
};

var nfgt = function (property, value) {
    if (property[0] >= value[3]) 	// Se solapan los nucleos de las funciones
        return 1;

    else if (property[1] <= value[2])  // No se solapan los nucleos
        return 0;

    else
        return (property[1] - value[2]) / ((value[3] - value[2]) - (property[0] - property[1]))  // TODO: round 2
};

var flt = function (property, value) {
    if (property[1] <= value[0]) 	// Se solapan los nucleos de las funciones
        return 1;

    else if (property[0] >= value[1])  // No se solapan los nucleos
        return 0;

    else
        return (property[0] - value[1]) / ((value[0] - value[1]) - (property[1] - property[0]))  // TODO: round 2
};

var nflt = function (property, value) {
    if (property[3] <= value[0])  // Se solapan los nucleos de las funciones
        return 1;

    else if (property[2]>=value[1])  // No se solapan los nucleos
        return 0;

    else
        return (property[2] - value[1]) / ((value[0] - value[1]) - (property[3] - property[2]))  // TODO: round 2
};

var fgte = function (property, value) {
    if (property[2] >= value[1])  // Se solapan los nucleos de las funciones
        return 1;

    else if (property[3] <= value[0])  // No se solapan los nucleos
        return 0;

    else
        return (property[3] - value[0]) / ((value[1] - value[0]) - (property[2] - property[3]))  // TODO: round 2
};

var nfgte = function (property, value) {
    if (property[0] >= value[1])  // Se solapan los nucleos de las funciones
        return 1;

    else if (property[1] <= value[0])  // No se solapan los nucleos
        return 0;

    else
        return (property[1] - value[0]) / ((value[1] - value[0]) - (property[0] - property[1]))  // TODO: round 2
};

var flte = function (property, value) {
    if (property[1] <= value[2]) 	// Se solapan los nucleos de las funciones
        return 1;

    else if (property[0] >= value[3])  // No se solapan los nucleos
        return 0;

    else
        return (value[3] - property[0]) / ((property[1] - property[0]) - (value[2] - value[3]))  // TODO: round 2
};

var nflte = function (property, value) {
    if (property[3] <= value[2]) 	// Se solapan los nucleos de las funciones
        return 1;

    else if (property[2] >= value[3])  // No se solapan los nucleos
        return 0;

    else
        return (value[3] - property[2]) / ((property[3] - property[2]) - (value[2] - value[3]))  // TODO: round 2
};

db.system.js.save({_id: 'trapezoid', value: trapezoid});
db.system.js.save({_id: 'feq', value: feq});
db.system.js.save({_id: 'nfeq', value: nfeq});
db.system.js.save({_id: 'fgt', value: fgt});
db.system.js.save({_id: 'nfgt', value: nfgt});
db.system.js.save({_id: 'flt', value: flt});
db.system.js.save({_id: 'nflt', value: nflt});
db.system.js.save({_id: 'fgte', value: fgte});
db.system.js.save({_id: 'nfgte', value: nfgte});
db.system.js.save({_id: 'flte', value: flte});
db.system.js.save({_id: 'nflte', value: nflte});

print('Funciones "trapezoid" y "feq" almacenadas c||rectamente.');
