"""
Created at 18/2/18
__author__ = 'Sergio Padilla'
"""
pipeline: [
    {$match: {
        'trape.0': { $lte:126000 },
        'trape.3': {$gte:104000},
        $expr: {
            $and: [
                {$lte: [
                    {$add: [
                        {$multiply: [{$arrayElemAt: ['$trape', 1]}, 0.4]},
                        {$multiply: [{$arrayElemAt: ['$trape', 0]}, 0.6]}
                    ]},
                    126000
                ]},
                {$gte: [
                    {$add: [
                        {$multiply: [{$arrayElemAt: ['$trape', 2]}, 0.4]},
                        {$multiply: [{$arrayElemAt: ['$trape', 3]}, 0.6]}
                    ]},
                    104000]
                }
            ]
        }
    }}
]


pipeline = [
    {$project: {
        _id: 0,
        trape_cdeg: {
            $cond: [
                {$and: [
                    {$gte: [{$arrayElemAt: ['$trape', 2]}, 110000]},
                    {$lte: [{$arrayElemAt: ['$trape', 1]}, 120000]}
                ]},
                1,
                {$cond: [
                    {$or: [
                        {$lte: [{$arrayElemAt: ['$trape', 3]}, 100000]},
                        {$gte: [{$arrayElemAt: ['$trape', 0]}, 130000]}
                    ]},
                    0,
                    {$cond: [
                        {$and: [
                            {$gt: [{$arrayElemAt: ['$trape', 3]}, 100000]},
                            {$lt: [{ $arrayElemAt: ['$trape', 2]}, 110000]}
                        ]},
                        {$divide: [
                            {$subtract: [
                                {$arrayElemAt: ['$trape', 3]},
                                100000
                            ]},
                            {$subtract: [
                                {$subtract: [110000,100000]},
                                {$subtract: [
                                    {$arrayElemAt: ['$trape', 2]},
                                    {$arrayElemAt: ['$trape', 3]}
                                ]}
                            ]}
                        ]},
                        {$divide: [
                            {$subtract: [
                                130000,
                                {$arrayElemAt: ['$trape', 0]}
                            ]},
                            {$subtract: [
                                {$subtract: [
                                    {$arrayElemAt: ['$trape', 1]},
                                    {$arrayElemAt: [ '$trape', 0 ]}
                                ]},
                                {$subtract: [120000, 130000]}
                            ]}
                        ]}
                    ]}
                ]}
            ]
        }
    }}
]