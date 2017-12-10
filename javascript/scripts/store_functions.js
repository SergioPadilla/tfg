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

    v = v.sort();
    switch(v.length) {
        case 1:
            return [v[0], v[0], v[0], v[0]];
        case 2:
            return [v[0], v[0], v[1], v[1]];
        case 3:
            return [v[0], v[1], v[1], v[2]];
        case 4:
            return v;
        default:
            throw 'Length must be smaller than 4';
    }
};

var evaluate = function (total, threshold) {
    if (threshold !== null) {
        if (threshold === 0)
            return total > threshold;

        else
            return total >= threshold;
    }
    else
        return total
};

var feq = function(property, value, threshold=null) {
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

    return evaluate(total, threshold)
};

var nfeq = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if ((property[1] <= value[0] && property[0] !== value[1]) || (property[2] >= value[3] && property[3] !== value[2]))
        total = 0;

    else if (property[0] < value[1])
        if (property[3] > value[2])
            total = Math.min(
                (property[1] - value[0]) / ((value[1] - value[0]) - (property[0] - property[1])),
                (property[2] - value[3]) / ((value[2] - value[3]) - (property[3] - property[2]))
            );

        else
            total = (property[1] - value[0]) / ((value[1] - value[0]) - (property[0] - property[1]));

    else if (property[3] > value[2])
        total = (property[2] - value[3]) / ((value[2] - value[3]) - (property[3] - property[2]));

    else
        total = 1;

    return evaluate(total, threshold)
};

var fgt = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[2] >= value[3])
        total = 1;

    else if (property[3] <= value[2])
        total = 0;

    else
        total = (property[3] - value[2]) / ((value[3] - value[2]) - (property[2] - property[3]));  // TODO: round 2

    return evaluate(total, threshold)
};

var nfgt = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[0] >= value[3])
        total = 1;

    else if (property[1] <= value[2])
        total = 0;

    else
        total = (property[1] - value[2]) / ((value[3] - value[2]) - (property[0] - property[1]));  // TODO: round 2

    return evaluate(total, threshold)
};

var flt = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[1] <= value[0])
        total = 1;

    else if (property[0] >= value[1])
        total = 0;

    else
        total = (property[0] - value[1]) / ((value[0] - value[1]) - (property[1] - property[0]));  // TODO: round 2

    return evaluate(total, threshold)
};

var nflt = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[3] <= value[0])
        total = 1;

    else if (property[2]>=value[1])
        total = 0;

    else
        total = (property[2] - value[1]) / ((value[0] - value[1]) - (property[3] - property[2]));  // TODO: round 2

    return evaluate(total, threshold)
};

var fgte = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[2] >= value[1])
        total = 1;

    else if (property[3] <= value[0])
        total = 0;

    else
        total = (property[3] - value[0]) / ((value[1] - value[0]) - (property[2] - property[3]));  // TODO: round 2

    return evaluate(total, threshold)
};

var nfgte = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[0] >= value[1])
        total = 1;

    else if (property[1] <= value[0])
        total = 0;

    else
        total = (property[1] - value[0]) / ((value[1] - value[0]) - (property[0] - property[1]));  // TODO: round 2

    return evaluate(total, threshold)
};

var flte = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[1] <= value[2])
        total = 1;

    else if (property[0] >= value[3])
        total = 0;

    else
        total = (value[3] - property[0]) / ((property[1] - property[0]) - (value[2] - value[3])); // TODO: round 2

    return evaluate(total, threshold)
};

var nflte = function (property, value, threshold=null) {
    property = trapezoid(property);
    value = trapezoid(value);
    var total = 0;

    if (property[3] <= value[2])
        total = 1;

    else if (property[2] >= value[3])
        total = 0;

    else
        total = (value[3] - property[2]) / ((property[3] - property[2]) - (value[2] - value[3])); // TODO: round 2

    return evaluate(total, threshold)
};

var fuzzy_find = function (collection, query, projection={}, out=null) {
    if (Object.prototype.toString.call(query) !== '[object Object]' ||
        Object.prototype.toString.call(projection) !== '[object Object]' ||
        Object.prototype.toString.call(collection) !== '[object String]')
        throw 'Incompatible type';

    if (out === null)
        out = {inline: 1};

    var fuzzy_properties = {};

    // 1. Parse query to create where clause with fuzzy properties
    var where_query = '';
    for (var property in query) {
        var subquery = query[property];
        var operator = null;

        if (subquery.hasOwnProperty('$feq'))
            operator = 'feq';

        if (subquery.hasOwnProperty('$nfeq'))
            operator = 'nfeq';

        if (subquery.hasOwnProperty('$fgt'))
            operator = 'fgt';

        if (subquery.hasOwnProperty('$nfgt'))
            operator = 'nfgt';

        if (subquery.hasOwnProperty('$flt'))
            operator = 'flt';

        if (subquery.hasOwnProperty('$nflt'))
            operator = 'nflt';

        if (subquery.hasOwnProperty('$fgte'))
            operator = 'fgte';

        if (subquery.hasOwnProperty('$nfgte'))
            operator = 'nfgte';

        if (subquery.hasOwnProperty('$flte'))
            operator = 'flte';

        if (subquery.hasOwnProperty('$nflte'))
            operator = 'nflte';

        if (operator !== null) {
            var value = subquery['$'+operator];

            fuzzy_properties[property] = {'operator': operator, 'value': value};

            var threshold = 0;

            if (subquery.hasOwnProperty('$thold'))
                threshold = subquery['$thold'];

            if (where_query.length != 0)
                where_query += ' && ';

            where_query = where_query + operator + '(this.' + property + ', [' + value + '], ' + threshold + ')';

            delete query[property];
        }
    }

    // 2. Set where clause
    if (where_query !== '')
        query['$where'] = where_query;

    // 3. Create map function to project the final document and calculate the special fuzzy projections
    function map() {
        var doc = {};

        if (Object.keys(projection).length === 0)  // if not projection, show all values
            doc = this;

        for (var fproperty in projection) {
            if (projection[fproperty] == true) {
                if (fproperty.includes('_cdeg')) {
                    var property = fproperty.replace('_cdeg', '');
                    var operator = fuzzy_properties[property]['operator'];
                    //var func = operator + "(" + doc[property] + ", " + fuzzy_properties[property]['value'] + ")";
                    //doc[fproperty] = eval("(" + func + ")");
                    doc[fproperty] = functions[operator](doc[property], fuzzy_properties[property]['value'])
                }
                else
                    doc[fproperty] = this[fproperty]
            }
        }

        emit(this._id, doc);
    }

    // 4. Execute map-reduce
    return db.runCommand(
        {
            mapReduce: collection,
            map: map,
            reduce: function (key, value) {
                return value;
            },
            out: out,
            query: query,
            scope: {
                projection: projection,
                fuzzy_properties: fuzzy_properties,
                functions: {
                    feq: feq,
                    nfeq: nfeq,
                    fgt: fgt,
                    nfgt: nfgt,
                    flt: flt,
                    nflt: nflt,
                    fgte: fgte,
                    nfgte: nfgte,
                    fgte: fgte,
                    nfgte: nfgte,
                    flte: flte,
                    nflte: nflte
                }
            }
        }
    );
};

db.system.js.save({_id: 'trapezoid', value: trapezoid});
db.system.js.save({_id: 'evaluate', value: evaluate});
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
db.system.js.save({_id: 'fuzzy_find', value: fuzzy_find});

print('Funciones almacenadas corectamente.');
