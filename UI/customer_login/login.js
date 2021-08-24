window.onload = function() {
	var submitButton = document.getElementById("login-button");
	submitButton.onclick = onSubmitButtonClick;
    
	var params = new URLSearchParams(window.location.search);
	let expiredUserParam = params.get('userExpired');
	
	var expiredUserDiv = document.getElementById("expired_user");
	if (expiredUserParam === 'true'){
		expiredUserDiv.style.display = "block";
	}
	else {
		expiredUserDiv.style.display = "none";
	}
};

var loginURL = "http:localhost:5000/auth/login"

function onSubmitButtonClick(event){
	event.preventDefault();
	
	
	var emailEl = document.getElementById("email-login");
	const emailValid = checkEmail(emailEl);

	var passwordEl = document.getElementById("password-login");
	const passwordSecure = checkPassword(passwordEl);
	
	var invalidTextEl = document.getElementById("invalid-text");
	invalidTextEl.textContent = '';
	if (!emailValid || !passwordSecure){
		return;
	}
	
	const loginDetails = {email:emailEl.value.trim(), password:passwordEl.value.trim() };
	console.log(loginDetails)
	const response = fetch(loginURL, {
		method: 'POST',
		body: JSON.stringify(loginDetails), // string or object
		headers: {
		  'Content-Type': 'application/json'
		}
	})
	.then(function(response) {
		
    	if (response.status !== 200) {
			console.log(`Looks like there was a problem. Status code: ${response.status}`);
			response.json()
			.then(function(data) {
				const invalidMessage = data.message;
				invalidTextEl.textContent = invalidMessage;
			});
		  	return;
    	}
		response.json()
	    .then(function(data) {
			console.log(data);
			localStorage.setItem("currentUser", JSON.stringify(data.user));
			localStorage.setItem("accessToken", JSON.stringify(data.access_token));
			const isAdmin = data.user.is_admin;
			if(isAdmin == 0){
				window.location.href = "../full_menu/customer_fullmenu.html";
			}
			else {
				window.location.href = "../admin_profile/admin_profile.html";
			}
		});
  	})
	.catch(function(error) {
		console.log("Fetch error: " + error);
	});

	
	

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


