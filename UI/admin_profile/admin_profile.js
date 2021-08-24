// JavaScript Document
window.onload = function() {
	
	const userString = localStorage.getItem('currentUser');
	console.log(userString);
	const userObject = JSON.parse(userString);
	console.log(userObject);
	
	const fullnameEl = document.getElementById("full_name_admin_profile");	
	fullnameEl.textContent = userObject.full_name;
	
	const emailEl = document.getElementById("email_admin_profile");	
	emailEl.textContent = userObject.email;
	
	const phoneEl = document.getElementById("phone_admin_profile");	
	phoneEl.textContent = userObject.phone;
	
	var editButton = document.getElementById("edit-button");
	editButton.onclick = onEditButtonClick;
       
};
const onEditButtonClick = (event) => {
	var modal = document.getElementById("editModal");

	// Get the button that opens the modal
	var editButton = document.getElementById("edit-button");
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	editButton.onclick = function() {
	  modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
	  }
	}
	
	var editModelButton = document.getElementById("edit-button-model");
	editModelButton.onclick = onEditModelButtonClick;
		
}
var editURL = "http:localhost:5000/users"
const onEditModelButtonClick = (event) => {
	event.preventDefault();
	
	var modal = document.getElementById("editModal");
	
	const accessToken = JSON.parse(localStorage.getItem('accessToken'));
	console.log(accessToken);
	
	
	var emailEl = document.getElementById("email-edit");
	const emailValid = checkEmail(emailEl);

	var fullnameEl= document.getElementById("fullname-edit");
	const fullnamevalid = checkfullname(fullnameEl);
	
	var phoneEl = document.getElementById("phone-edit");
	const phoneValid = checkPhone(phoneEl);
	
	var currentPasswordEl = document.getElementById("current-password");
	var newPasswordEl = document.getElementById("new-password");
	var passwordConfirEl = document.getElementById("password-confirmation-edit");
	
	let passwordValid = false;
	const passwordsEntered = checkPasswordEntered(currentPasswordEl, newPasswordEl, passwordConfirEl);
	if(passwordsEntered){
		if(isNotEmpty(newPasswordEl.value.trim())){
			const passwordSecure = checkPasswordSecure(newPasswordEl);
			if(passwordSecure){
				const passwordConfirValid = checkPasswordConfirmation(passwordConfirEl, newPasswordEl);
				passwordValid = passwordConfirValid;
			}
		}
		else{
			passwordValid = true;
		}
		
	}

	if(emailValid && fullnamevalid && phoneValid && passwordValid ){
		const editDetails = {
			email: emailEl.value.trim(), 
			new_password: newPasswordEl.value.trim(), 
			current_password: currentPasswordEl.value.trim(),
			full_name: fullnameEl.value.trim(), 
			phone: phoneEl.value.trim(),

		};
		console.log(editDetails);
		const response = fetch(editURL, {
			method: 'PUT',
			body: JSON.stringify(editDetails), // string or object
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${accessToken}`
			}
		})
		.then(function(response) {
			if (response.status !== 200) {
				console.log(`Looks like there was a problem. Status code: ${response.status}`);
				response.json()
				.then(function(data) {
					const invalidMessage = data.message;
					if (response.status === 401){
						let userExpired = true;
						let params = new URLSearchParams();
						params.append("userExpired", JSON.stringify(userExpired));
						window.location.href = "../customer_login/customer_login.html?" + params.toString();
			
					}
					console.log(invalidMessage);
				});
				return;
			}
			response.json()
			.then(function(data) {
				console.log(data);
				localStorage.setItem("currentUser", JSON.stringify(data.user));
				const userString = localStorage.getItem('currentUser');
				const userObject = JSON.parse(userString);
				swal({
				  title: "Success",
				  text: "User updated sucessfully!",
				  icon: "success",
				  button: "OK",
				})
				.then(() => {
					console.log("okclick");
					modal.style.display = "none";
					const fullnameEl = document.getElementById("full_name_admin_profile");	
					fullnameEl.textContent = userObject.full_name;

					const emailEl = document.getElementById("email_admin_profile");	
					emailEl.textContent = userObject.email;

					const phoneEl = document.getElementById("phone_admin_profile");	
					phoneEl.textContent = userObject.phone;
				});
//				localStorage.setItem("accessToken", JSON.stringify(data.access_token));
//				const isAdmin = data.user.is_admin;
//				if(isAdmin == 1){
//					window.location.href = "../admin_profile/admin_profile.html";
//				}
			});
		})
		.catch(function(error) {
			console.log("Fetch error: " + error);
		});
	}
	

}

function isNotEmpty(value){
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
	if(!isNotEmpty(emailText)){
		showSuccess(emailEl);
		valid = true;
	}
	else if(!isEmailvalid(emailText)){
		showError(emailEl, "Email is not valid");
	}
	else{
		showSuccess(emailEl);
		valid = true;
	}
	
	return valid; 
}

function checkPasswordEntered(currentPasswordEl, newPasswordEl, passwordConfirEl ){
	let valid = false;
	const currentPasswordText = currentPasswordEl.value.trim();
	const newPasswordText = newPasswordEl.value.trim();
	const passwordConfirmationText = passwordConfirEl.value.trim();
	if(isNotEmpty(currentPasswordText) && isNotEmpty(newPasswordText) && isNotEmpty(passwordConfirmationText) ){
		console.log("success");
		showSuccess(currentPasswordEl);
		showSuccess(passwordConfirEl);
		showSuccess(newPasswordEl);
		valid = true;
		
	}
	else if(isNotEmpty(currentPasswordText) && !isNotEmpty(newPasswordText) && !isNotEmpty(passwordConfirmationText) ){
		showSuccess(currentPasswordEl);
		showError(newPasswordEl, "Enter new password or remove current password");
		showError(passwordConfirEl, "Enter Password Confirmation or remove current pasword");	
	}
	else if(!isNotEmpty(currentPasswordText) && isNotEmpty(newPasswordText) && !isNotEmpty(passwordConfirmationText) ){
		showSuccess(newPasswordEl);
		showError(currentPasswordEl, "Enter current password or remove new password");
		showError(passwordConfirEl, "Enter Password Confirmation or remove new pasword");	
	}
	else if(!isNotEmpty(currentPasswordText) && !isNotEmpty(newPasswordText) && isNotEmpty(passwordConfirmationText) ){
		showSuccess(passwordConfirEl);
		showError(currentPasswordEl, "Enter current password or remove Password Confirmation");
		showError(newPasswordEl, "Enter new password or remove Password Confirmation");	
	}
	else if(isNotEmpty(currentPasswordText) && isNotEmpty(newPasswordText) && !isNotEmpty(passwordConfirmationText) ){
		showSuccess(currentPasswordEl);
		showSuccess(newPasswordEl);
		showError(passwordConfirEl, "Enter Password Confirmation or remove current pasword & new password");	
	}
	else if(!isNotEmpty(currentPasswordText) && isNotEmpty(newPasswordText) && isNotEmpty(passwordConfirmationText) ){
		showSuccess(passwordConfirEl);
		showSuccess(newPasswordEl);
		showError(currentPasswordEl, "Enter current password or remove Password Confirmation & new password");
	}
	else if(isNotEmpty(currentPasswordText) && !isNotEmpty(newPasswordText) && isNotEmpty(passwordConfirmationText) ){
		showSuccess(currentPasswordEl);
		showSuccess(passwordConfirEl);
		showError(newPasswordEl, "Enter new password or remove Password Confirmation & current password");
	}
	else if(!isNotEmpty(currentPasswordText) && !isNotEmpty(newPasswordText) && !isNotEmpty(passwordConfirmationText) ){
		showSuccess(passwordConfirEl);
		showSuccess(currentPasswordEl);
		showSuccess(newPasswordEl);
		valid = true;
	}
	return valid;
}

function checkPasswordConfirmation(passwordConfirEl, newPasswordEl){
	let valid = false;
	const newPasswordText = newPasswordEl.value.trim();
	const passwordConfirmationText = passwordConfirEl.value.trim();
	if(passwordConfirmationText !== newPasswordText){
		showError(passwordConfirEl, "The Passwords do not match");
	}
	else{
		showSuccess(passwordConfirEl);
		valid = true;
	}
	return valid;
}

function checkPasswordSecure(newPasswordEl){
	let valid = false;
	const passwordText = newPasswordEl.value.trim();
	if(!isPasswordSecure(passwordText)){
		showError(newPasswordEl, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
	}
	else{
		showSuccess(newPasswordEl);
		valid = true;
	}
	return valid;
}
function checkfullname(fullnameEl){
	let valid = false;
	const fullnameText = fullnameEl.value.trim();
	if(!isNotEmpty(fullnameText)){
		showSuccess(fullnameEl);
		valid = true;
	}
	else if(!isFullnameValid(fullnameText)){
		showError(fullnameEl, "fullname is not valid");
	}
	else{
		showSuccess(fullnameEl);
		valid = true;
	}
	return valid; 
}

function checkPhone(phoneEl){
	let valid = false;
	const phoneText = phoneEl.value.trim();
	if(!isNotEmpty(phoneText)){
		showSuccess(phoneEl);
		valid = true;
	}
	else if(!isPhoneValid(phoneText)){
		showError(phoneEl, "Phone is not valid");
	}
	else{
		showSuccess(phoneEl);
		valid = true;
	}
	return valid;
}



