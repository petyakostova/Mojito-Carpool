import 'jquery'
import { globals } from "globals.js"

import { DOMManipulationController } from './../DOMController/DOMManipulationController.js'
import { DOMEventHandlerController } from './../DOMController/DOMEventHandlerController.js'

var currentUserController = (function ($) {
	var currentUserController = {};

	currentUserController.displayCurrentUserInApplication = function () {
		globals.everlive.Users.currentUser()
			.then(function (currentUser) {
				if (currentUser.result) {
					DOMManipulationController.displayCurrentUserInMenu();
				} else {
					DOMManipulationController.removeCurrentUserFromMenu();
				}
			});
	}
	
	currentUserController.displayUserProfile = function() {
		globals.everlive.Users.currentUser()
			.then(function(user) {
				return user.result
			})
			.then(function(currentUser) {
				var profileTemplateHTML = $('#profile-template').html(),
					profileTemplate = Handlebars.compile(profileTemplateHTML);
				
				$('.profile').append(profileTemplate({
					name: currentUser.DisplayName,
					email: currentUser.Email,
					age: currentUser.Age,
					city: currentUser.City
				}));
			})
	}

	return currentUserController;
} (jQuery));

export { currentUserController }
