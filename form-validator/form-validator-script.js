const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) { //Show input error message. input parameter is equal to the field that is generating the error, while message is the error message to be displayed.
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function getFieldName(input){ //Gets the field name from a specified input and capitalizes the first letter.
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check email is valid
function checkEmail(input){
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(validEmail.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, "Email isn't valid.");
    }
}

//Check required fields
function checkRequired(inputArray){
    inputArray.forEach(function(input){  //High order array method. Basically just array methods that take in a function.
        if(input.value.trim() === ""){
            showError(input, `${getFieldName(input)} is required.`); // ` ` allows you to output variables alongside string.
        } else {
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max){
    if (input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords do NOT match.");
    }
}

//Event Listeners
form.addEventListener("submit", function(e){ //"e" stands for event. It represents an event object.
    e.preventDefault(); //Prevents the default behavior of submit (stops the button from doing anything when clicked since this is just a demo).

    checkRequired([username, email, password]); //Passes in an array of all the required fields we want to check.
    checkLength(username, 6, 20);
    checkLength(password, 8, 20); //Checks length of password. Password must be at least 8 chars, but less than 20 chars.
    checkEmail(email); //Checks to see if email is valid.
    checkPasswordsMatch(password, password2); //Checks to see if passwords match one another.
})