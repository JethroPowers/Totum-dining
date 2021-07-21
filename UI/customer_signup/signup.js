// JavaScript Document
window.onload = function() {
	
	
	var submitButton = document.getElementById("signup-button");
	submitButton.onclick = onSubmitButtonClick;
    
};

function onSubmitButtonClick(event){
	event.preventDefault();
	var emailEl = document.getElementById("email-signup");
	const emailValid = checkEmail(emailEl);
	
	var passwordEl = document.getElementById("password-signup");
	const passwordSecure = checkPassword(passwordEl);
	
	var fullnameEl= document.getElementById("fullname");
	const fullnamevalid = checkfullname(fullnameEl);
	
	var phoneEl = document.getElementById("phone");
	const phoneValid = checkPhone(phoneEl);
	
	var passwordConfirEl = document.getElementById("password-confirmation");
	const passwordConfirValid = checkPasswordConfirmation(passwordConfirEl, passwordEl);

}

function isRequired(value){
	return (value ? true : false);
	
}


function isBetween(value, min, max){
	return(value.length < min || value.length > max ? false : true );
		
}

function isFullnameValid(fullname){
	const re =/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
	return re.test(fullname);
}

function isPhoneValid(phone){
	const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	return re.test(phone)
}
// 

function isEmailvalid(email){
	const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function isPasswordSecure(password){
	const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	return re.test(password);
}
//
//function isPasswordConfirmationValid(passwordCorfir){
//	const re pass
//	return re.test(password);
//}



function showError(input, message){
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");
	const error = formField.querySelector("small");
	error.textContent = message;
	
}
function showSuccess(input){
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");
	const error = formField.querySelector("small");
	error.textContent = "";
	
}

function checkEmail(emailEl){
	let valid = false;
	const emailText = emailEl.value.trim();
	if(!isRequired(emailText)){
		showError(emailEl, "Email cannot be blank");
	}
	else if(!isEmailvalid(emailText)){
		showError(emailEl, "Email is not valid");
	}
	else{
		showSuccess(emailEl);
		valid = true;
	}
	return valid 
}

function checkPassword(passwordEl){
	let valid = false;
	const passwordText = passwordEl.value.trim();
	if(!isRequired(passwordText)){
		showError(passwordEl, "Password cannot be blank");
	}
	else if(!isPasswordSecure(passwordText)){
		showError(passwordEl, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
	}
	else{
		showSuccess(passwordEl);
		valid = true;
	}
	return valid 
}

function checkPasswordConfirmation(passwordConfirEl, passwordEl){
	let valid = false;
	const passwordConfirText = passwordConfirEl.value.trim();
	const passwordText = passwordEl.value.trim();
	if(!isRequired(passwordConfirText)){
		showError(passwordConfirEl, "Password Confirmation cannot be blank");
	}
	else if(passwordConfirText !== passwordText){
		showError(passwordConfirEl, "The Passwords do not match");
	}
	else{
		showSuccess(passwordConfirEl);
		valid = true;
	}
	return valid 
}

function checkfullname(fullnameEl){
	let valid = false;
	const fullnameText = fullnameEl.value.trim();
	if(!isRequired(fullnameText)){
		showError(fullnameEl, "fullname cannot be blank");
	}
	else if(!isFullnameValid(fullnameText)){
		showError(fullnameEl, "fullname is not valid");
	}
	else{
		showSuccess(fullnameEl);
		valid = true;
	}
	return valid 
}

function checkPhone(phoneEl){
	let valid = false;
	const phoneText = phoneEl.value.trim();
	if(!isRequired(phoneText)){
		showError(phoneEl, "Phone cannot be blank");
	}
	else if(!isPhoneValid(phoneText)){
		showError(phoneEl, "Phone is not valid");
	}
	else{
		showSuccess(phoneEl);
		valid = true;
	}
	return valid 
}

