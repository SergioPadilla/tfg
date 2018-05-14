var feq = {
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

var nfeq = {
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

var fgt = {
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

var nfgt = {
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

var flt = {
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

var nflt = {
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

var fgte = {
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

var nfgte = {
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

var flte = {
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

var nflte = {
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
