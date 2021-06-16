let db;

const request = window.indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {

    db = event.target.result;

    const BudgetStore = db.createObjectStore("BudgetStore", {
        autoIncrement: true
    });

};

request.onsuccess = function (event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function (event) {
    const msg = event.target.result
    console.log(msg.errorCode)
};

function saveRecord(record) {
    db = request.result;
    const transaction = db.transaction(["BudgetStore"], "readwrite");
    const BudgetStore = transaction.objectStore("BudgetStore");

    BudgetStore.add(record);
};

function checkDatabase() {

};