const baseUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&";
const cryptoParam = document.querySelectorAll(".cryptocurrency"); //Stores all cryptos from the HTML class cryptocurrency. "." is class.
const cryptoName = document.querySelectorAll("#name"); //Stores id = name within a crypto. "#" is id. Used to update DOM dynamically.
const cryptoPrice = document.querySelectorAll("#price"); //Stores id = price within a crypto. "#" is id. Used to update DOM dynamically.
const cryptoPercentChange = document.querySelectorAll("#percent-change"); //Stores id = percent-change within a crypto. "#" is id. Used to update DOM dynamically.

//Fetch current price of all cryptos in USD from CoinGecko API.
function getPrice(){
    
    for (let i = 0; i < cryptoParam.length; i++){
        const cryptocurrency = cryptoParam.item(i).id;

        fetch(`${baseUrl}&ids=${cryptocurrency}`)
            .then(response => response.json())
            .then(myJSONArray => {      
                const myJSONObject = myJSONArray[0]; //From the JSON array myJSONArray, only retrieve the object at index 0 of the array. Store the data returned (of type JSON object) in a const, myJSONObject.
                const name = myJSONObject["name"]; //Search for the key "name" in myJSONObject and return its corresponding value.
                const price = myJSONObject["current_price"]; //Search for the key "current_price" in myJSONObject and return its corresponding value.
                const percentChange = myJSONObject["price_change_percentage_24h"]; //Search for the key "price_change_percentage_24h" in myJSONObject and return its corresponding value.

                cryptoName[i].innerText = name; //Set the HTML div with the id "name" inner text equal to the value of the name const.
                cryptoPrice[i].innerText = `Price: $${price}`; //Set the HTML div with the id "price" inner text equal to the value of the price const.
                cryptoPercentChange[i].innerText = `Day Change: ${percentChange.toFixed(2)}%`; //Set the HTML div with the id "percent-change" inner text equal to the value of the percentChange const, up to 2 decimal places.

                if (percentChange > 0.00) cryptoParam[i].style.backgroundColor = "rgba(9, 207, 69, 0.25)"; //If change is positive, set CSS color to green.
                if (percentChange < 0.00) cryptoParam[i].style.backgroundColor = "rgba(255, 0, 0, 0.25)"; //If change is negative, set CSS color to red. If no percent change, leave default value set by CSS.
          });
    }
}

//On page reload, call the API and get latest price data.
window.onload = getPrice();