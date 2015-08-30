import 'jquery'
import { globals } from 'globals.js'

var DOMManipulationController = (function($){
	var DOMManipulationController = {};
	
	DOMManipulationController.displayLogInMessage = function(status) {
		if(status === 'success') { 
			DOMManipulationController.displayCurrentUserInMenu();
			$('.log-in-user-error').css("display", "none");
			$('.log-in-user-success').css("opacity", 1);
		} else if (status === 'error') {
			$('.log-in-user-success').css("display", "none");
			$('.log-in-user-error').css("opacity", 1);
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
	
	DOMManipulationController.displayCurrentUserInMenu = function() {
		globals.everlive.Users.currentUser()
			.then(function (user) {
				return user.result.DisplayName;
			})
			.then(function (name) {
					var template = '<li class="header_menu_list_item" id="my-profile"><a href="#" class="header_menu_list_item_link">Hello, {{name}}</a></li>',
						element = Handlebars.compile(template);	
						
					$('.navbar-right').append(element({ name: name}));
			});
	}
	
	
	DOMManipulationController.scrollToContent = function() {
		$('body').animate({scrollTop: $('.header').height()}, 400);
	}
	
	return DOMManipulationController;
}(jQuery))

export {
	DOMManipulationController
}