window.onload = function() {
	
	
	var submitButton = document.getElementById("login-button");
	submitButton.onclick = onSubmitButtonClick;
    
};

function onSubmitButtonClick(event){
	event.preventDefault();
	var emailEl = document.getElementById("email-login");
	const emailValid = checkEmail(emailEl);
	
//	if(isRequired(email.value)){ 
//		console.log("email has something");
//	}
//
//	else{
//		console.log("email has nothing");	
//	}
//	if ( isEmailvalid(email.value)){
//		console.log("email is valid");
//	}
//	else{
//		console.log("email is not valid");	
//	}
//	
	var passwordEl = document.getElementById("password-login");
	const passwordSecure = checkPassword(passwordEl);
//	if(isRequired(password.value)){ 
//		console.log("password has something");
//	}
//	else{
//		console.log("password has nothing");	
//	}
//	if(isBetween(email.value, 5, 40)){
//		console.log("email is between 5 and 40");
//	}
//	else{
//		console.log("email not between 5 and 40");
//	}
//	if ( isPasswordSecure(password.value)){
//		console.log("password is secure");
//	}
//	else{
//		console.log("password is not secure");	
//	}
	

}

function isRequired(value){
	return (value ? true : false);
	
}


function isBetween(value, min, max){
	return(value.length < min || value.length > max ? false : true );
		
}

function isEmailvalid(email){
	const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function isPasswordSecure(password){
	const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	return re.test(password);
}


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
	else{
		showSuccess(passwordEl);
		valid = true;
	}
	return valid 
}


