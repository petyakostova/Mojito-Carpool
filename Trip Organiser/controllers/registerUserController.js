import { user } from "/modules/user/user"
import { globals as globals } from "globals.js"
import 'jquery'

function registerUser(){
	var $submitRegistration_btn = $('.register_input-submit');
	
	$submitRegistration_btn.click(function(){
		var $username = $('#usernameInput').val(),
			$email = $('#emailInput').val(),
			$password = $('#passwordInput').val(),
			$repeatPassword = $('#repeatPasswordInput').val(),
			$firstName = $('#firstNameInput').val(),
			$lastName = $('#lastNameInput').val(),
			$age = $('#ageInput').val() | 0,
			$city = $('#cityInput').val();
			
		if(!areMatchingPasswords($password, $repeatPassword)) {
			user.displayInvalidPasswordMessege($('#passwordInput'));
			user.displayInvalidPasswordMessege($('#repeatPasswordInput'));
		}
		
		var newUser = Object.create(user).init($username, $email, $password, $firstName, $lastName, $age, $city);
		
		globals.everlive.Users.register(
			$username,
			$password,
			{
				Email: $email,
				DisplayName: $firstName + ' ' + $lastName,
				Age: $age,
				City: $city
			}
		)
	});
}

function areMatchingPasswords(password, repeatPassword) {
	return password === repeatPassword;
}

export { registerUser }