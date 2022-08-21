const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions")); //Our transactions will be stored as a String, so we want to parse it from an array into a String Array.

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : []; //Checks to see if there are any items in localStorage. If there are, use localStorageTransactions as the array. Else, use an empty array.

//Add a new transaction
function addTransaction(e) {
    e.preventDefault(); //Prevents the button from actually submitting.

    if (text.value.trim() === "" || amount.value.trim() === ""){
        alert("Please add a name and amount.");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: parseFloat(amount.value), //Need to parseFloat since amount.value is a String and we need it as a double/float.
        };

        transactions.push(transaction); //Add (push) the new transaction to the end of the array.

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = ""; //Clears input fields after transaction is added.
        amount.value = "";
    }
}

//Generate random transaction ID
function generateID(){
    return (Math.random() * 10000)
}


//Add transactions to DOM list
function addTransactionDOM(transaction){
    //Get sign of transaction
    const sign = transaction.amount < 0 ? "-" : "+"; //If transaction.amount is LESS than 0 then use "-", else use "+".

    const item = document.createElement("li");

    //Add plus/minus class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `; //Wrapping transaction.amount in Math.abs removes any negative signs that may be present.

    list.appendChild(item); //Add a child item (item) within the parent container (list).
}

//Update balance, income, and expenses
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((accumulator, item) => (accumulator += item), 0)
    .toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((accumulator, item) => (accumulator +=item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((accumulator, item) => (accumulator +=item), 0)*(-1)
        .toFixed(2));

    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

//Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id); //Adds everything into the transactions array except the specified transaction ID.

    updateLocalStorage();

    init();
}

//Update local storage transactions
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

//Init (initialize) app
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

//Event Listeners
form.addEventListener("submit", addTransaction);