import 'jquery';
import { globals } from 'globals.js';

import { DOMEventHandlerController } from './DOMEventHandlerController';

import { currentUserController } from './../userControllers/currentUserController' 
var DOMManipulationController = (function($){
	var DOMManipulationController = {};
	
	DOMManipulationController.displayLogInMessage = function(status) {
		if(status === 'success') { 
			DOMManipulationController.displayCurrentUserInMenu();
			$('.log-in-error').css("display", "none");
			$('.log-in-success').css("opacity", 1);
		} else if (status === 'error') {
			$('.log-in-success').css("display", "none");
			$('.log-in-error').css("opacity", 1);
		}
	}
	
	DOMManipulationController.displayRegisterMessage = function(status) {
		if(status === 'success') {
			$('.register-user-error').css("display", "none");
			$('.register-user-success').css("opacity", 1);
		} else if (status === 'error') {
			$('.register-user-success').css("display", "none");
			$('.register-user-error').css("opacity", 1);
		}
	}
	
	DOMManipulationController.displayUploadMessage = function(status) {
		if(status === 'success') {
			$('.profile_upload-image-error').css("display", "none");
			$('.profile_upload-image-success').css("opacity", 1);
		} else if (status === 'error') {
			$('.profile_upload-image-success').css("display", "none");
			$('.profile_upload-image-error').css("opacity", 1);
		}
	}
	
	DOMManipulationController.displayCurrentUserInMenu = function() {
		globals.everlive.Users.currentUser()
			.then(function (user) {
				return user.result.DisplayName;
			})
			.then(function (name) {
					var template = '<li class="header_menu_list_item" id="navigation_btn-my-profile"><a id="link-my-profile" href="#" class="header_menu_list_item_link">{{name}}</a></li>',
						element = Handlebars.compile(template);	
						
					$('.navbar-right').append(element({ name: name}));
					DOMManipulationController.displayLogInOrLogOutCTA('Log out');
					$('#navigation_btn-register').css('display', 'none');
					
					$('#navigation_btn-my-profile').click(function(e) {
						e.preventDefault();
						DOMEventHandlerController.buttonClickEventHandler('../../views/myProfileView.html', [currentUserController.displayUserProfile]);
					});
			});
	}
	
	DOMManipulationController.removeCurrentUserFromMenu = function() {
		$('#navigation_btn-my-profile').remove();
		DOMManipulationController.displayLogInOrLogOutCTA('Log in');
		$('#navigation_btn-register').css('display', 'block');
	}
	
	DOMManipulationController.displayLogInOrLogOutCTA = function(cta) {
		$('#link-log-in-out').text(cta)
							.attr("data-info", cta === "Log in" ? "log-in" : "log-out");
	}
	
	DOMManipulationController.scrollToContent = function() {
		$('body').animate({scrollTop: $('.header').height()}, 400);
	}
	
	return DOMManipulationController;
}(jQuery))

export {
	DOMManipulationController
}