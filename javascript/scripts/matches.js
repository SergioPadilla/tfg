var field_0 = field_name + '.0';
var field_1 = field_name + '.1';
var field_2 = field_name + '.2';
var field_3 = field_name + '.3';

var feq = {
    $match: {
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
    }
};

var L_CT_fgt = threshold*field_3 + one_thold*field_2;
var L_CT_fgte = threshold*field_1 + one_thold*field_0;
var fgt = {
    $match: {
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
};

var U_CT_lgt = threshold*field_0 + one_thold*field_1;
var U_CT_lgte = threshold*field_2 + one_thold*field_3;
var flt = {
    $match: {
        [field_0]: {$lte: U_CT},
        $expr: {
            $lte: [
                {$add: [
                    {$multiply: [{arrayElemAt: [field_name, 1]}, threshold]},
                    {$multiply: [{arrayElemAt: [field_name, 0]}, one_thold]}
                ]},
                U_CT
            ]
        }
    }
};
