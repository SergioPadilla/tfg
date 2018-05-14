
db.loadServerScripts();

let result = fuzzy_find('Tab_25',{'trape': {'$fgt': [100000,110000,120000,130000], '$thold': 0.6}},{});

let batch = result['cursor']['firstBatch'];
let i = batch.length;
let cursor_id = result['cursor']['id'];
let cursor_id_2 = cursor_id;

while (cursor_id.toString() === cursor_id_2.toString()) {
    result = db.runCommand({
        'getMore': cursor_id,
        'collection': 'Tab_25'
    });
    batch = result['cursor']['nextBatch'];
    cursor_id_2 = result['cursor']['id'];
    i = i + batch.length;
}

print('i: ' + i);
