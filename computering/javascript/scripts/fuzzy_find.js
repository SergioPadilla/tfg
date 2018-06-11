/*
To use this scripts follow this steps:
    1 - Execute mongo server (mongod command)
    2 - Execute the command to load this script in the database
            ej: mongo localhost/test fuzzy_find.js
    3 - Open mongo shell (mongo command)
    4 - Use database where you loaded script before
            ej: use test
    5 - Load server functions (db.loadServerScripts(); command)
    6 - Execute query
            ej: fuzzy_find('Tab_25', {'trape': {'$feq': [100000,110000,120000,130000], '$thold': 0.6}}, {'trape_cdeg': 1})
 */


////////////////////////////////////////////////////////////////////////////////////
//
//  MATCHES function
//
////////////////////////////////////////////////////////////////////////////////////

function feq(field_name, value, threshold) {
    let field_0 = field_name + '.0';
    let field_3 = field_name + '.3';
    let one_thold = 1 - threshold;
    let L_CT = threshold*value[1] + one_thold*value[0];
    let U_CT = threshold*value[2] + one_thold*value[3];

    return {
        [field_0]: {$lte: U_CT},
        [field_3]: {$gte: L_CT},
        $expr: {
            $and: [
                {$lte: [
                    {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 1]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 0]}, one_thold]}
                    ]},
                    U_CT
                ]},
                {$gte: [
                    {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 2]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 3]}, one_thold]}
                    ]},
                    L_CT
                ]}
            ]
        }
    };
}

function fgt(field_name, value, threshold) {
    let field_3 = field_name + '.3';
    let one_thold = 1 - threshold;
    let L_CT = threshold*value[3] + one_thold*value[2];

    return {
        [field_3]: {$gte: L_CT},
        $expr: {
            $gte: [
                {$add: [
                    {$multiply: [{$arrayElemAt: ['$'+field_name, 2]}, threshold]},
                    {$multiply: [{$arrayElemAt: ['$'+field_name, 3]}, one_thold]}
                ]},
                L_CT
            ]
        }
    }
}

function fgte(field_name, value, threshold) {
    let field_3 = field_name + '.3';
    let one_thold = 1 - threshold;
    let L_CT = threshold*value[1] + one_thold*value[0];

    return {
        [field_3]: {$gte: L_CT},
        $expr: {
            $gte: [
                {$add: [
                    {$multiply: [{$arrayElemAt: ['$'+field_name, 2]}, threshold]},
                    {$multiply: [{$arrayElemAt: ['$'+field_name, 3]}, one_thold]}
                ]},
                L_CT
            ]
        }
    }
}

function flt(field_name, value, threshold) {
    let field_0 = field_name + '.0';
    let one_thold = 1 - threshold;
    let U_CT = threshold*value[0] + one_thold*value[1];

    return {
        [field_0]: {$lte: U_CT},
        $expr: {
            $lte: [
                {$add: [
                    {$multiply: [{$arrayElemAt: ['$'+field_name, 1]}, threshold]},
                    {$multiply: [{$arrayElemAt: ['$'+field_name, 0]}, one_thold]}
                ]},
                U_CT
            ]
        }
    }
}

function flte(field_name, value, threshold) {
    let field_0 = field_name + '.0';
    let one_thold = 1 - threshold;
    let U_CT = threshold*value[2] + one_thold*value[3];

    return {
        [field_0]: {$lte: U_CT},
        $expr: {
            $gte: [
                {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 1]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 0]}, one_thold]}
                    ]},
                U_CT
            ]
        }
    }
}

function nfeq(field_name, value, threshold) {
    let field_1 = field_name + '.1';
    let field_2 = field_name + '.2';
    let one_thold = 1 - threshold;
    let L_CT = threshold*value[1] + one_thold*value[0];
    let U_CT = threshold*value[2] + one_thold*value[3];

    return {
        [field_1]: {$lte: U_CT, $gte: L_CT},
        [field_2]: {$lte: U_CT},
        $expr: {
            $and: [
                {$lte: [
                    {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 3]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 2]}, one_thold]}
                    ]},
                    U_CT
                ]},
                {$gte: [
                    {$add: [
                            {$multiply: [{$arrayElemAt: ['$'+field_name, 0]}, threshold]},
                            {$multiply: [{$arrayElemAt: ['$'+field_name, 1]}, one_thold]}
                        ]},
                    L_CT
                ]}
            ]
        }
    };
}

function nfgt(field_name, value, threshold) {
    let field_1 = field_name + '.1';
    let one_thold = 1 - threshold;
    let L_CT = threshold*value[3] + one_thold*value[2];

    return {
        [field_1]: {$gte: L_CT},
        $expr: {
            $gte: [
                {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 0]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 1]}, one_thold]}
                    ]},
                L_CT
            ]
        }
    }
}

function nfgte(field_name, value, threshold) {
    let field_1 = field_name + '.1';
    let one_thold = 1 - threshold;
    let L_CT = threshold*value[1] + one_thold*value[0];

    return {
        [field_1]: {$gte: L_CT},
        $expr: {
            $gte: [
                {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 0]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 1]}, one_thold]}
                    ]},
                L_CT
            ]
        }
    }
}

function nflt(field_name, value, threshold) {
    let field_2 = field_name + '.2';
    let one_thold = 1 - threshold;
    let U_CT = threshold*value[0] + one_thold*value[1];

    return {
        [field_2]: {$lte: U_CT},
        $expr: {
            $lte: [
                {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 3]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 2]}, one_thold]}
                    ]},
                U_CT
            ]
        }
    }
}

function nflte(field_name, value, threshold) {
    let field_2 = field_name + '.2';
    let one_thold = 1 - threshold;
    let U_CT = threshold*value[2] + one_thold*value[3];

    return {
        [field_2]: {$lte: U_CT},
        $expr: {
            $lte: [
                {$add: [
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 3]}, threshold]},
                        {$multiply: [{$arrayElemAt: ['$'+field_name, 2]}, one_thold]}
                    ]},
                U_CT
            ]
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////
//
//  end MATCHES functions
//
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
//
//  PROJECTION function
//
////////////////////////////////////////////////////////////////////////////////////

function feq_cdeg(field_name, value) {
    return {
        $cond: [
            {$and: [
                {$gte: [{$arrayElemAt: ['$'+field_name, 2]}, value[1]]},
                {$lte: [{$arrayElemAt: ['$'+field_name, 1]}, value[2]]}
            ]},
            1,
            {$cond: [
                {$or: [
                    {$lte: [{$arrayElemAt: ['$'+field_name, 3]}, value[0]]},
                    {$gte: [{$arrayElemAt: ['$'+field_name, 0]}, value[3]]}
                ]},
                0,
                {$cond: [
                    {$and: [
                        {$gt: [{$arrayElemAt: ['$'+field_name, 3]}, value[0]]},
                        {$lt: [{$arrayElemAt: ['$'+field_name, 2]}, value[1]]}
                    ]},
                    {$divide: [
                        {$subtract: [
                            {$arrayElemAt: ['$'+field_name, 3]},
                            value[0]
                        ]},
                        {$subtract: [
                            {$subtract: [
                                value[1],
                                value[0]
                            ]},
                            {$subtract: [
                                {$arrayElemAt: ['$'+field_name, 2]},
                                {$arrayElemAt: ['$'+field_name, 3]}
                            ]}
                        ]}
                    ]},
                    {$divide: [
                        {$subtract: [
                            value[3],
                            {$arrayElemAt: ['$'+field_name, 0]}
                        ]},
                        {$subtract: [
                            {$subtract: [
                                {$arrayElemAt: ['$'+field_name, 1]},
                                {$arrayElemAt: ['$'+field_name, 0 ]}
                            ]},
                            {$subtract: [
                                value[2],
                                value[3]
                            ]}
                        ]}
                    ]}
                ]}
            ]}
        ]
    };
}

function fgt_cdeg(field_name, value) {
    return {
        $cond: [
            {$gte: [{$arrayElemAt: ['$'+field_name, 2]}, value[3]]},
            1,
            {$cond:[
                {$lte: [{$arrayElemAt: ['$'+field_name, 3]}, value[2]]},
                0,
                {$divide: [
                    {$subtract: [
                        {$arrayElemAt: ['$'+field_name, 3]},
                        value[2]
                    ]},
                    {$subtract: [
                        {$subtract: [
                            value[3],
                            value[2]
                        ]},
                        {$subtract: [
                            {$arrayElemAt: ['$'+field_name, 2]},
                            {$arrayElemAt: ['$'+field_name, 3]}
                        ]}
                    ]}
                ]}
            ]}
        ]
    };
}

function flt_cdeg(field_name, value) {
    return {
        $cond: [
            {$lte: [{$arrayElemAt: ['$'+field_name, 1]}, value[0]]},
            1,
            {$cond:[
                {$gte: [{$arrayElemAt: ['$'+field_name, 0]}, value[1]]},
                0,
                {$divide: [
                    {$subtract: [
                        {$arrayElemAt: ['$'+field_name, 0]},
                        value[1]
                    ]},
                    {$subtract: [
                        {$subtract: [
                            value[0],
                            value[1]
                        ]},
                        {$subtract: [
                            {$arrayElemAt: ['$'+field_name, 1]},
                            {$arrayElemAt: ['$'+field_name, 0]}
                        ]}
                    ]}
                ]}
            ]}
        ]
    };
}

function fgte_cdeg(field_name, value) {
    return {
        $cond: [
            {$gte: [{$arrayElemAt: ['$'+field_name, 2]}, value[1]]},
            1,
            {$cond:[
                {$lte: [{$arrayElemAt: ['$'+field_name, 3]}, value[0]]},
                0,
                {$divide: [
                    {$subtract: [
                        {$arrayElemAt: ['$'+field_name, 3]},
                        value[0]
                    ]},
                    {$subtract: [
                        {$subtract: [
                            value[1],
                            value[0]
                        ]},
                        {$subtract: [
                            {$arrayElemAt: ['$'+field_name, 2]},
                            {$arrayElemAt: ['$'+field_name, 3]}
                        ]}
                    ]}
                ]}
            ]}
        ]
    };
}

function flte_cdeg(field_name, value) {
    return {
        $cond: [
            {$lte: [{$arrayElemAt: ['$'+field_name, 1]}, value[2]]},
            1,
            {$cond:[
                {$gte: [{$arrayElemAt: ['$'+field_name, 0]}, value[3]]},
                0,
                {$divide: [
                    {$subtract: [
                        value[3],
                        {$arrayElemAt: ['$'+field_name, 0]}
                    ]},
                    {$subtract: [
                        {$subtract: [
                            {$arrayElemAt: ['$'+field_name, 1]},
                            {$arrayElemAt: ['$'+field_name, 0]}
                        ]},
                        {$subtract: [
                            value[2],
                            value[3]
                        ]}
                    ]}
                ]}
            ]}
        ]
    };
}

function nfeq_cdeg(field_name, value) {
    return {
        $cond: [
            {$or: [
                    {$and: [
                            {$lte: [{$arrayElemAt: ['$'+field_name, 1]}, value[0]]},
                            {$eq: [{$arrayElemAt: ['$'+field_name, 0]}, value[1]]}
                        ]},
                    {$and: [
                            {$gte: [{$arrayElemAt: ['$'+field_name, 2]}, value[3]]},
                            {$eq: [{$arrayElemAt: ['$'+field_name, 3]}, value[2]]}
                        ]}
                ]},
            0,
            {$cond: [
                    {$lt: [{$arrayElemAt: ['$'+field_name, 0]}, value[1]]},
                    {$cond: [
                            {$gt: [{$arrayElemAt: ['$'+field_name, 3]}, value[2]]},
                            {$min: [
                                    {$divide: [
                                            {$subtract: [
                                                    {$arrayElemAt: ['$'+field_name, 1]},
                                                    value[0]
                                                ]},
                                            {$subtract: [
                                                    {$subtract: [
                                                            value[1],
                                                            value[0]
                                                        ]},
                                                    {$subtract: [
                                                            {$arrayElemAt: ['$'+field_name, 0]},
                                                            {$arrayElemAt: ['$'+field_name, 1]}
                                                        ]}
                                                ]}
                                        ]},
                                    {$divide: [
                                            {$subtract: [
                                                    {$arrayElemAt: ['$'+field_name, 2]},
                                                    value[3]
                                                ]},
                                            {$subtract: [
                                                    {$subtract: [
                                                            value[2],
                                                            value[3]
                                                        ]},
                                                    {$subtract: [
                                                            {$arrayElemAt: ['$'+field_name, 3]},
                                                            {$arrayElemAt: ['$'+field_name, 2]}
                                                        ]}
                                                ]}
                                        ]}
                                ]},
                            {$divide: [
                                    {$subtract: [
                                            {$arrayElemAt: ['$'+field_name, 1]},
                                            value[0]
                                        ]},
                                    {$subtract: [
                                            {$subtract: [
                                                    value[1],
                                                    value[0]
                                                ]},
                                            {$subtract: [
                                                    {$arrayElemAt: ['$'+field_name, 0]},
                                                    {$arrayElemAt: ['$'+field_name, 1]}
                                                ]}
                                        ]}
                                ]}
                        ]},
                    {$cond: [
                            {$gt: [{$arrayElemAt: ['$'+field_name, 3]}, value[2]]},
                            {$divide: [
                                    {$subtract: [
                                            {$arrayElemAt: ['$'+field_name, 2]},
                                            value[3]
                                        ]},
                                    {$subtract: [
                                            {$subtract: [
                                                    value[2],
                                                    value[3]
                                                ]},
                                            {$subtract: [
                                                    {$arrayElemAt: ['$'+field_name, 3]},
                                                    {$arrayElemAt: ['$'+field_name, 2]}
                                                ]}
                                        ]}
                                ]},
                            1
                        ]}
                ]}
        ]
    };
}

function nfgt_cdeg(field_name, value) {
    return {
        $cond: [
            {$gte: [{$arrayElemAt: ['$'+field_name, 0]}, value[3]]},
            1,
            {$cond:[
                    {$lte: [{$arrayElemAt: ['$'+field_name, 1]}, value[2]]},
                    0,
                    {$divide: [
                            {$subtract: [
                                    {$arrayElemAt: ['$'+field_name, 1]},
                                    value[2]
                                ]},
                            {$subtract: [
                                    {$subtract: [
                                            value[3],
                                            value[2]
                                        ]},
                                    {$subtract: [
                                            {$arrayElemAt: ['$'+field_name, 0]},
                                            {$arrayElemAt: ['$'+field_name, 1]}
                                        ]}
                                ]}
                        ]}
                ]}
        ]
    };
}

function nfgte_cdeg(field_name, value) {
    return {
        $cond: [
            {$gte: [{$arrayElemAt: ['$'+field_name, 0]}, value[1]]},
            1,
            {$cond:[
                    {$lte: [{$arrayElemAt: ['$'+field_name, 1]}, value[0]]},
                    0,
                    {$divide: [
                            {$subtract: [
                                    {$arrayElemAt: ['$'+field_name, 1]},
                                    value[0]
                                ]},
                            {$subtract: [
                                    {$subtract: [
                                            value[1],
                                            value[0]
                                        ]},
                                    {$subtract: [
                                            {$arrayElemAt: ['$'+field_name, 0]},
                                            {$arrayElemAt: ['$'+field_name, 1]}
                                        ]}
                                ]}
                        ]}
                ]}
        ]
    };
}

function nflt_cdeg(field_name, value) {
    return {
        $cond: [
            {$lte: [{$arrayElemAt: ['$'+field_name, 3]}, value[0]]},
            1,
            {$cond:[
                    {$gte: [{$arrayElemAt: ['$'+field_name, 2]}, value[1]]},
                    0,
                    {$divide: [
                            {$subtract: [
                                    {$arrayElemAt: ['$'+field_name, 2]},
                                    value[1]
                                ]},
                            {$subtract: [
                                    {$subtract: [
                                            value[0],
                                            value[1]
                                        ]},
                                    {$subtract: [
                                            {$arrayElemAt: ['$'+field_name, 3]},
                                            {$arrayElemAt: ['$'+field_name, 2]}
                                        ]}
                                ]}
                        ]}
                ]}
        ]
    };
}

function nflte_cdeg(field_name, value) {
    return {
        $cond: [
            {$lte: [{$arrayElemAt: ['$'+field_name, 3]}, value[2]]},
            1,
            {$cond:[
                {$gte: [{$arrayElemAt: ['$'+field_name, 2]}, value[3]]},
                0,
                {$divide: [
                    {$subtract: [
                        value[3],
                        {$arrayElemAt: ['$'+field_name, 2]}
                    ]},
                    {$subtract: [
                        {$subtract: [
                            {$arrayElemAt: ['$'+field_name, 3]},
                            {$arrayElemAt: ['$'+field_name, 2]}
                        ]},
                        {$subtract: [
                            value[2],
                            value[3]
                        ]}
                    ]}
                ]}
            ]}
        ]
    };
}
////////////////////////////////////////////////////////////////////////////////////
//
//  end PROJECTION functions
//
////////////////////////////////////////////////////////////////////////////////////

function split_queries(query) {
    // remove all fuzzy properties
    let fuzzy_operators = ['$feq', '$nfeq', '$fgt', '$fgte', '$flt', '$flte'];
    let fquery = {};
    for (let property in query) {
        let prop_query = query[property];
        if (Object.prototype.toString.call(prop_query) === '[object Object]'
            || Object.prototype.toString.call(prop_query) === '[object BSON]') {
            let is_fuzzy = false;
            for (let i = 0; i < fuzzy_operators.length && !is_fuzzy; i++) {
                if (prop_query.hasOwnProperty(fuzzy_operators[i]))
                    is_fuzzy = true;
            }

            if (is_fuzzy) {
                fquery[property] = prop_query;
                delete query[property]
            }
        }
    }

    return [query, fquery];
}

function trapezoid(x) {
    if (Object.prototype.toString.call(x) !== '[object Array]' &&
        Object.prototype.toString.call(x) !== '[object Number]')
        throw 'Incompatible type: ' + x + ' ' + Object.prototype.toString.call(x);

    if (Object.prototype.toString.call(x) === '[object Array]') {
        for (let i = 0; i < x.length; i++) {
            if (Object.prototype.toString.call(x[i]) !== '[object Number]')
                throw 'Incompatible type';
        }
    }

    let v = x;
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
}

function parse_fuzzy(fquery) {
    let fuzzy_operators = ['$feq', '$fgt', '$fgte', '$flt', '$flte', '$nfeq', '$nfgt', '$nfgte', '$nflt', '$nflte'];
    let query = {};
    let foperators = {};

    for (let fproperty in fquery) {
        let fsubquery = fquery[fproperty];

        for (let i = 0; i < fuzzy_operators.length; i++) {
            let operator = fuzzy_operators[i];

            if (fsubquery.hasOwnProperty(operator)) {

                if (foperators.hasOwnProperty(fproperty))
                    foperators[fproperty].push(operator);
                else
                    foperators[fproperty] = [operator];

                let func = operator.toString().substring(1);
                let value = trapezoid(fsubquery[operator]);
                let threshold = fsubquery.hasOwnProperty('$thold') ? fsubquery['$thold'] : 0;
                let to_eval = func + '("' + fproperty + '", [' + value + '], ' + threshold + ')';
                let match = eval(to_eval);
                for (let property in match) {
                    query[property] = match[property];
                }
            }
        }
    }

    return [query, foperators];
}

function get_match(query, fquery) {
    let match_stage = {$match: {}};

    for (let property in query) {
        match_stage['$match'][property] = query[property];
    }
    for (let property in fquery) {
        match_stage['$match'][property] = fquery[property];
    }

    return match_stage;
}

function get_projection(fquery, foperators, projection) {
    let stage = {$project: {}};

    for (let property in projection) {
        if (property.includes('_cdeg') && projection[property] === 1) {
            let fproperty = property.replace('_cdeg', '');

            if (foperators[fproperty].length !== 1)
                throw 'Projection failed';

            let operator = foperators[fproperty][0];
            let func = operator.toString().substring(1);
            let value = trapezoid(fquery[fproperty][operator]);
            let to_eval = func + '_cdeg("' + fproperty + '", [' + value + '])';
            stage['$project'][property] = eval(to_eval);
        }
        else {
            stage['$project'][property] = projection[property];
        }
    }

    return stage;
}

function fuzzy_find(collection, filter, projection, count_name=null) {
    // 1. Check types
    if ((Object.prototype.toString.call(filter) !== '[object Object]' && Object.prototype.toString.call(filter) !== '[object BSON]') ||
        (Object.prototype.toString.call(projection) !== '[object Object]' && Object.prototype.toString.call(filter) !== '[object BSON]') ||
        (Object.prototype.toString.call(collection) !== '[object String]' && Object.prototype.toString.call(filter) !== '[object BSON]') ||
        (count_name !== null && Object.prototype.toString.call(count_name) !== '[object String]'))
        throw 'Incompatible type';

    let stages = [];
    let queries = split_queries(filter);
    let query = queries[0];
    let fuzzy = parse_fuzzy(queries[1]);
    let fquery = fuzzy[0];
    let foperators = fuzzy[1];

    stages.push(get_match(query, fquery));

    if (Object.keys(projection).length !== 0)  // check for empty object
        stages.push(get_projection(queries[1], foperators, projection));

    if (count_name !== null)
        stages.push({'$count': count_name});

    // return  db.runCommand(
    //     {
    //         aggregate: "Tab_25",
    //         pipeline: stages,
    //         cursor: {}
    //     }
    // );
    return db[collection].aggregate(stages);
}

// matches functions
db.system.js.save({_id: 'feq', value: feq});
db.system.js.save({_id: 'fgt', value: fgt});
db.system.js.save({_id: 'fgte', value: fgte});
db.system.js.save({_id: 'flt', value: flt});
db.system.js.save({_id: 'flte', value: flte});

db.system.js.save({_id: 'nfeq', value: nfeq});
db.system.js.save({_id: 'nfgt', value: nfgt});
db.system.js.save({_id: 'nfgte', value: nfgte});
db.system.js.save({_id: 'nflt', value: nflt});
db.system.js.save({_id: 'nflte', value: nflte});

// projection functions
db.system.js.save({_id: 'feq_cdeg', value: feq_cdeg});
db.system.js.save({_id: 'nfeq_cdeg', value: nfeq_cdeg});
db.system.js.save({_id: 'fgt_cdeg', value: fgt_cdeg});
db.system.js.save({_id: 'nfgt_cdeg', value: nfgt_cdeg});
db.system.js.save({_id: 'flt_cdeg', value: flt_cdeg});
db.system.js.save({_id: 'nflt_cdeg', value: nflt_cdeg});
db.system.js.save({_id: 'fgte_cdeg', value: fgte_cdeg});
db.system.js.save({_id: 'nfgte_cdeg', value: nfgte_cdeg});
db.system.js.save({_id: 'flte_cdeg', value: flte_cdeg});
db.system.js.save({_id: 'nflte_cdeg', value: nflte_cdeg});

// functions
db.system.js.save({_id: 'split_queries', value: split_queries});
db.system.js.save({_id: 'parse_fuzzy', value: parse_fuzzy});
db.system.js.save({_id: 'trapezoid', value: trapezoid});
db.system.js.save({_id: 'get_match', value: get_match});
db.system.js.save({_id: 'get_projection', value: get_projection});
db.system.js.save({_id: 'fuzzy_find', value: fuzzy_find});

print('Funciones almacenadas corectamente.');
