const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); //Selects the all the seat classes from the row classes from the DOM that are NOT occupied, and stores it in a constant.
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = parseInt(movieSelect.value); //let is a way of defining variables in JS. movieSelect.value is the cost of a movie.

populateUI();

function setMovieData(movieIndex, moviePrice){ //Save selected movie index and price.
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCountAndTotal(){ //Updates total cost and count.
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    //Copies selected seats into array, then map through array, and then return a new array of indexes. Map is similar to for-each, but it returns an array.
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat)
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex)); //Converts our array into a JSON string as part of a key-value pair, and saves the item to the local browser storage.

    const selectedSeatsCount = selectedSeats.length; //Gets number of elements in the NodeList (similar to an Array data structure)

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI(){ //Get data from localstorage in user's browser and populate UI with data.
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); //JSON.parse converts the String back into an array. Basically opposite of JSON.stringify

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) > -1) { //If the seat is in the array, it will return a value greater than -1. If it ISN'T in the array, it will return a value of -1.
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

movieSelect.addEventListener("change", function(e){ //Movie Select Event.
    ticketPrice = e.target.value;
    setMovieData(e.target.SelectedIndex, e.target.value);
    updateSelectedCountAndTotal();
});

container.addEventListener("click", function(e) { //Seat Click Event.
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){ //.target just refers to the element selected by the user.
        e.target.classList.toggle("selected"); //If user clicks available seat, it will toggle (convert) it to a selected seat.

        updateSelectedCountAndTotal();
    }
});

//Initial count and total set
updateSelectedCountAndTotal();


