let fuzzy_operators = ['$feq', '$nfeq', '$fgt', '$fgte', '$flt', '$flte'];

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
                        {$multiply: [{arrayElemAt: [field_name, 1]}, threshold]},
                        {$multiply: [{arrayElemAt: [field_name, 0]}, one_thold]}
                    ]},
                    U_CT
                ]},
                {$gte: [
                    {$add: [
                        {$multiply: [{arrayElemAt: [field_name, 2]}, threshold]},
                        {$multiply: [{arrayElemAt: [field_name, 3]}, one_thold]}
                    ]},
                    L_CT
                ]}
            ]
        }
    };
}

function nfeq(field_name, value, threshold) {
    let field_0 = field_name + '.0';
    let field_3 = field_name + '.3';
    let one_thold = 1 - threshold;
    let L_CT = threshold*value[1] + one_thold*value[0];
    let U_CT = threshold*value[2] + one_thold*value[3];

    return {
        [field_0]: {$gte: U_CT},
        [field_3]: {$lte: L_CT},
        $expr: {
            $and: [
                {$gte: [
                    {$add: [
                        {$multiply: [{arrayElemAt: [field_name, 1]}, threshold]},
                        {$multiply: [{arrayElemAt: [field_name, 0]}, one_thold]}
                    ]},
                    U_CT
                ]},
                {$lte: [
                    {$add: [
                        {$multiply: [{arrayElemAt: [field_name, 2]}, threshold]},
                        {$multiply: [{arrayElemAt: [field_name, 3]}, one_thold]}
                    ]},
                    L_CT
                ]}
            ]
        }
    }
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
                    {$multiply: [{arrayElemAt: [field_name, 2]}, threshold]},
                    {$multiply: [{arrayElemAt: [field_name, 3]}, one_thold]}
                ]},
                L_CT
            ]
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////
//
//  end MATCHES functions
//
////////////////////////////////////////////////////////////////////////////////////

function fuzzy_find(collection, filter, projection) {
    // 1. Check types
    if (Object.prototype.toString.call(filter) !== '[object Object]' ||
        Object.prototype.toString.call(projection) !== '[object Object]' ||
        Object.prototype.toString.call(collection) !== '[object String]')
        throw 'Incompatible type';

    let match_stage = get_match(filter);
}

function split_queries(query) {
    // remove all fuzzy properties
    let fquery = {};
    for (let property in fquery) {
        let prop_query = fquery[property];
        if (Object.prototype.toString.call(prop_query) === '[object Object]') {
            let is_fuzzy = false;
            for (let i = 0; i < fuzzy_operators.length && !is_fuzzy; i++) {
                if (prop_query.hasOwnProperty(fuzzy_operators[i]))
                    is_fuzzy = true;
            }

            if (is_fuzzy)
                fquery[property] = prop_query;
                delete query[property]
        }
    }

    return [query, fquery];
}

function parse_fuzzy(fquery) {
    let query = {};

    for (let fproperty in fquery) {
        let fsubquery = fquery[fproperty];

        for (let i = 0; i < fuzzy_operators.length; i++) {
            let operator = fuzzy_operators[i];

            if (fsubquery.hasOwnProperty(operator)) {
                let func = operator.toString().substring(1);
                let value = fsubquery[operator];
                let threshold = fsubquery.hasOwnProperty('$thold') ? fsubquery['$thold'] : 0;
                let match = eval(func + '(' + fproperty + ', ' + value + ', ' + threshold + ')')
                for (let property in match) {
                    query[property] = match[property];
                }
            }
        }
    }

    return query;
}

function get_match(filter) {
    let queries = split_queries(filter);
    let query = queries[0];
    let fquery = parse_fuzzy(queries[1]);

    let match_stage = {$match: {}};

    for (let property in query) {
        match_stage['$match'][property] = query[property];
    }
    for (let property in fquery) {
        match_stage['$match'][property] = fquery[property];
    }

    return match_stage;
}