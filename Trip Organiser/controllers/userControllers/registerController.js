import 'jquery'
import { user } from "/../modules/user/userModule"
import { buttonClickEventHandler } from "/controllers/menuController"
import { logIn } from "/controllers/userControllers/logInController.js"
import { globals as globals } from "globals.js"

function areMatchingPasswords(password, repeatedPassword) {
	return password === repeatedPassword;
}

function register() {
	var $registrationSubmitButton = $('.register_input-submit');

	$registrationSubmitButton.click(registerEventHandler);
	$('#redirect_btn').click(function () {
		buttonClickEventHandler('../views/logInView.html', [logIn]);
	});
}

function registerEventHandler() {
	var username = $('#usernameInput').val(),
		email = $('#emailInput').val(),
		password = $('#passwordInput').val(),
		repeatedPassword = $('#repeatPasswordInput').val(),
		firstName = $('#firstNameInput').val(),
		lastName = $('#lastNameInput').val(),
		age = $('#ageInput').val() | 0,
		city = $('#cityInput').val();

	if (!areMatchingPasswords(password, repeatedPassword)) {
		user.displayInvalidPasswordMessege($('#passwordInput'));
		user.displayInvalidPasswordMessege($('#repeatPasswordInput'));
	}

	var newUser = Object.create(user).init(username, email, password, firstName, lastName, age, city);

	globals.everlive.Users.register(
		newUser.username,
		newUser.password,
		{
			Email: newUser.email,
			DisplayName: newUser.firstName + ' ' + newUser.lastName,
			Age: newUser.age,
			City: newUser.city
		}, function () {
			$('.register-user-error').css("display", "none");
			$('.register-user-success').css("opacity", 1);
		}, function () {
			$('.register-user-success').css("display", "none");
			$('.register-user-error').css("opacity", 1);
		}
	);
}

export { register }