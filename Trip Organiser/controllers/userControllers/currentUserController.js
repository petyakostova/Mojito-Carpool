import 'jquery'
import { globals } from "globals.js"

import { DOMManipulationController } from './../DOMController/DOMManipulationController.js'
import { DOMEventHandlerController } from './../DOMController/DOMEventHandlerController.js'

var currentUserController = (function ($) {

	function displayCurrentUserInApplication () {
		globals.everlive.Users.currentUser()
			.then(function (currentUser) {
				if (currentUser.result) {
					DOMManipulationController.displayCurrentUserInMenu();
					DOMManipulationController.displayCurrentUserProfile();
				} else {
					DOMManipulationController.removeCurrentUserFromMenu();
				}
			});
	}

	return {
		displayCurrentUserInApplication: displayCurrentUserInApplication	
	};
} (jQuery));

export { currentUserController }
