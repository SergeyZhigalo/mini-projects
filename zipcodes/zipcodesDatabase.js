function withDB(callback) {
    let request = indexedDB.open("zipcodes", 1);
    request.onerror = console.error;
    request.onsuccess = () => {
        let db = request.result;
        callback(db);
    };
    request.onupgradeneeded = () => { initdb(request.result, callback); };
}
function initdb(db, callback) {
    let store = db.createObjectStore("zipcodes", { keyPath: "zipcode" });
    store.createIndex("cities", "city");
    fetch("zipcodes.json")
        .then(response => response.json())
        .then(zipcodes => {
            let transaction = db.transaction(["zipcodes"], "readwrite");
            transaction.onerror = console.error;
            let store = transaction.objectStore("zipcodes");
            for(let record of zipcodes) { store.put(record); }
            transaction.oncomplete = () => { callback(db); };
        });
}
export function lookupCity(zip, callback) {
    withDB(db => {
        let transaction = db.transaction(["zipcodes"]);
        let zipcodes = transaction.objectStore("zipcodes");
        let request = zipcodes.get(zip);
        request.onerror = console.error;
        request.onsuccess = () => {
            let record = request.result;
            if (record) {
                callback(`Город: ${record.city}`);
            } else {
                callback(null);
            }
        };
    });
}
export function lookupZipcodes(city, callback) {
    withDB(db => {
        let transaction = db.transaction(["zipcodes"]);
        let store = transaction.objectStore("zipcodes");
        let index = store.index("cities");
        let request = index.getAll(city);
        request.onerror = console.error;
        request.onsuccess = () => { callback(request.result); };
    });
}