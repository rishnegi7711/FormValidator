const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// Show inpur error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

// Check email validity
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input,'Email is not valid');
    }
}

//Check required function(to avoid usage of too many if statements)

function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

//to take individaul field name and capitalise the first letter
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//to check length of username and password fields

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);

    } else {
        showSuccess(input);
    }
}

//to check macthing passwords
function checkPasswordsMatch(input1,input2){
if(input1.value===input2.value){
    showSuccess(input);
} else {
    showError(input2, 'Passwords do not match');
}
}
// Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 15);
    checkLength(password, 5, 15);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
});


username.addEventListener("blur",function(event){
    checkLength(event.target.value,5,15);
})

password.addEventListener("blur",function(event){
checkLength(event.target.value,5,15);
})