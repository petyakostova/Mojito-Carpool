import 'jquery'
import { user } from "/modules/user/userModule"
import { globals as globals } from "globals.js"

function areMatchingPasswords(password, repeatPassword) {
	return password === repeatPassword;
}

function registerUser(){
	var $registrationSubmitButton = $('.register_input-submit');
	
	$registrationSubmitButton.click(registerUserEventHandler);
}

function registerUserEventHandler() {
	var $username 		  = $('#usernameInput').val(),
		$email 			  = $('#emailInput').val(),
		$password 		  = $('#passwordInput').val(),
		$repeatedPassword = $('#repeatPasswordInput').val(),
		$firstName 		  = $('#firstNameInput').val(),
		$lastName 		  = $('#lastNameInput').val(),
		$age 			  = $('#ageInput').val() | 0,
		$city 			  = $('#cityInput').val();
		
	if(!areMatchingPasswords($password, $repeatedPassword)) {
		user.displayInvalidPasswordMessege($('#passwordInput'));
		user.displayInvalidPasswordMessege($('#repeatPasswordInput'));
	}
	
	var newUser = Object.create(user).init($username, $email, $password, $firstName, $lastName, $age, $city);
	
	globals.everlive.Users.register(
		newUser.username,
		newUser.password,
		{
			Email: $email,
			DisplayName: newUser.firstName + ' ' + newUser.lastName,
			Age: newUser.age,
			City: newUser.city
		}
	);
}

export { registerUser }