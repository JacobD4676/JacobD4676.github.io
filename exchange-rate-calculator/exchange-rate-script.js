//App uses free API from "exchangerate.host". Special thanks to them!
const currencyElement1 = document.getElementById("currency-one");
const currencyElement2 = document.getElementById("currency-two");
const amountElement1 = document.getElementById("amount-one");
const amountElement2 = document.getElementById("amount-two");
const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");
const baseURL = "https://api.exchangerate.host/latest?base=";

//Fetch exchange rates and update the DOM.
function calculate (){
    const currency1 = currencyElement1.value;
    const currency2 = currencyElement2.value;

    fetch(`${baseURL}${currency1}`)
    .then(response => response.json())
    .then(data => {
        const rate = data.rates[currency2];
        
        rateElement.innerText = `1 ${currency1} = ${rate} ${currency2}`;

        amountElement2.value = (amountElement1.value * rate).toFixed(3);
    });
}

//Event Listeners
currencyElement1.addEventListener("change", calculate);
amountElement1.addEventListener("input", calculate);
currencyElement2.addEventListener("change", calculate);
amountElement1.addEventListener("input", calculate);

swap.addEventListener("click", () => {
    const temp = currencyElement1.value;
    currencyElement1.value = currencyElement2.value;
    currencyElement2.value = temp;
    calculate();
});

calculate();