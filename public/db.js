let db;

const request = window.indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {

    db = event.target.result;

    const budgetStore = db.createObjectStore("budgetStore", {
        autoIncrement: true
    });
    budgetStore.createIndex("budgetIndex", "budgetIndex");
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
    const transaction = db.transaction(["budgetStore"], "readwrite");
    const budgetStore = transaction.objectStore("budgetStore");

    budgetStore.add(record);
};

function checkDatabase() {
    db = request.result;
    const transaction = db.transaction(["BudgetStore"], "readwrite");
    const budgetStore = transaction.objectStore("BudgetStore");
  //const budgetIndex = budgetStore.createIndex("budgetIndex", "budgetIndex")
};