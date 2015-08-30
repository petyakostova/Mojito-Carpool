import 'jquery'
import { globals } from "globals.js"

import { DOMManipulationController } from './../DOMController/DOMManipulationController.js'
import { DOMEventHandlerController } from './../DOMController/DOMEventHandlerController.js'

import { currentUserController } from './currentUserController.js';

import { user } from './../../modules/user/userModule.js'

var authenticationController = (function ($) {
	var authenticationController = {};

	authenticationController.logIn = function () {
		function logInHandler() {
			var username = $('#usernameInput').val(),
				password = $('#passwordInput').val();

			globals.everlive.authentication.login(
				username,
				password,
				function() {
					currentUserController.displayCurrentUserInApplication();
				});
		}

		$('.log-in_input-submit').click(function () {
			logInHandler();
		});

		$('#redirect_btn').click(function () {
			DOMEventHandlerController.buttonClickEventHandler('../views/registerView.html', [authenticationController.register]);
		});
	}

	authenticationController.logOut = function () {
		globals.everlive.authentication.logout(
			function () {
				currentUserController.displayCurrentUserInApplication();
			},
			function () {
				
			}
			);
	}



	authenticationController.register = function () {
		function areMatchingPasswords(password, repeatedPassword) {
			return password === repeatedPassword;
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
				},
				DOMManipulationController.displayRegisterMessage('success'),
				DOMManipulationController.displayRegisterMessage('error')
				);
		}

		var $registrationSubmitButton = $('.register_input-submit');

		$registrationSubmitButton.click(registerEventHandler);
		$('#redirect_btn').click(function () {
			DOMEventHandlerController.buttonClickEventHandler('../views/logInView.html', [authenticationController.logIn]);
		});
	}

	return authenticationController;
} (jQuery));

export { authenticationController }