
db.loadServerScripts();

let cursor = fuzzy_find('Tab_25',{'trape': {'$fgt': [100000,110000,120000,130000], '$thold': 0.6}},{});
let i = 0;

while (cursor.hasNext()) {
    i = i + 1;
    let doc = cursor.next()
}

print('i: ' + i);
