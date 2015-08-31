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
				
				globals.everlive.Files.getById(currentUser.Image)
					.then(function(data){
						return data.result;
					})
					.then(function(image){
						$('.profile').append(profileTemplate({
							name: currentUser.DisplayName,
							email: currentUser.Email,
							age: currentUser.Age,
							city: currentUser.City,
							image: image.Uri
						}));
					})
					.then(function(){
						DOMEventHandlerController.editImageButtonClickEventHandler();
						DOMEventHandlerController.uploadImageButtonClickEventHandler();
					});
			})
	}
	
	currentUserController.uploadProfileImage = function(imageId) {
		globals.everlive.Users.currentUser()
			.then(function(data){
				return data.result
			})
			.then(function(currentUser){
				globals.everlive.Users.updateSingle({"Id": currentUser.Id, "Image": imageId},
					function(data){
						console.log(JSON.stringify(data));
					},
					function(err){
						console.log(JSON.stringify(err));
					});
			});
	}

	return currentUserController;
} (jQuery));

export { currentUserController }
