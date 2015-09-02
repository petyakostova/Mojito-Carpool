import 'jquery'
import { globals } from "globals.js"

import { DOMManipulationController } from './../DOMController/DOMManipulationController.js'
import { DOMEventHandlerController } from './../DOMController/DOMEventHandlerController.js'

import { currentUserController } from './currentUserController.js';

import { user } from './../../modules/user/userModule.js'

var authenticationController = (function ($) {

	function logIn () {
		function logInHandler() {
			var username = $('#input--username').val(),
				password = $('#input--password').val();

			globals.everlive.authentication.login(
				username,
				password,
				function() {
					currentUserController.displayCurrentUserInApplication();
				});
			
			DOMEventHandlerController.buttonClickEventHandler('../views/myProfileView.html', [currentUserController.displayCurrentUserInApplication]);
		}

		$('.form__field_input--type-submit').click(function () {
			logInHandler();
		});

		$('.btn__redirect').click(function () {
			DOMEventHandlerController.redirectButtonClick('../views/registerView.html', [register]);
		});
	}

	function logOut () {
		globals.everlive.authentication.logout(
			function () {
				currentUserController.displayCurrentUserInApplication();
			},
			function () {
				
			}
		);
	}



	function  register () {
		function areMatchingPasswords(password, repeatedPassword) {
			return password === repeatedPassword;
		}

		function registrationHandler() {
			var username = $('#input--username').val(),
				email = $('#input--email').val(),
				password = $('#input--password').val(),
				repeatedPassword = $('#input--password-repeated').val(),
				firstName = $('#input--first-name').val(),
				lastName = $('#input--last-name').val(),
				age = $('#input--age').val() | 0,
				city = $('#input--city').val();

			if (!areMatchingPasswords(password, repeatedPassword)) {
				DOMManipulationController.displayInvalidPasswordMessege($('#input--password'));
				DOMManipulationController.displayInvalidPasswordMessege($('#input--password-repeated'));
			}
			
			var newUser = Object.create(user).init(username, email, password, firstName, lastName, age, city);

			globals.everlive.Users.register(
				newUser.username,
				newUser.password,
				{
					Email: newUser.email,
					DisplayName: newUser.firstName + ' ' + newUser.lastName,
					Age: newUser.age,
					City: newUser.city,
					Image: 'f7b5dc60-4fd4-11e5-9d9e-b3b5aaf017f7'
				},
				DOMManipulationController.displayRegisterMessage('success'),
				DOMManipulationController.displayRegisterMessage('error')
				);
		}

		$('.form__field__input--type-submit').click(function(){
			registrationHandler();
		});
		$('.btn__redirect').click(function () {
			DOMEventHandlerController.redirectButtonClick('../views/logInView.html', [logIn]);
		});
	}

	return {
		logIn: logIn,
		logOut: logOut,
		register: register
	};
} (jQuery));

export { authenticationController }