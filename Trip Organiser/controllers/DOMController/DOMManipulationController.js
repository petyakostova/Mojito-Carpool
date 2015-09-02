import 'jquery';
import { globals } from 'globals.js';

import { DOMEventHandlerController } from './DOMEventHandlerController';

import { currentUserController } from './../userControllers/currentUserController' 
var DOMManipulationController = (function($){
	function displayStatusMessage(status, methodDelegates) {
		if(status === 'success') {
			$('.form__messagebox--state-error').css("display", "none");
			$('.form__messagebox--state-success').css("opacity", 1);
			if(methodDelegates) {
				globals.functions.executeMethodDelegates(methodDelegates);
			}
		} else if (status === 'error') {
			$('.form__messagebox--state-success').css("display", "none");
			$('.form__messagebox--state-error').css("opacity", 1);
		}
	}
	
	function compileHandlebarsTemplate(template) {
		var templateHTML = template,
			templateAsDOMElement = Handlebars.compile(templateHTML);
			
		return templateAsDOMElement;
	};
	
	function displayCurrentUserInMenu() {
		globals.everlive.Users.currentUser()
			.then(function (user) {
				return user.result.DisplayName;
			})
			.then(function (name) {
					var template = '<li class="menu__list__item" view="myProfile"><a href="#" class="menu__list__item__link">{{name}}</a></li>',
						templateAsDOMElement = compileHandlebarsTemplate(template)	
						
					$('.navbar-right').append(templateAsDOMElement({ name: name}));
					displayLogInOrLogOutCTA('Log out');
					$('.menu__list__item[view="register"]').css('display', 'none');
					
					$('.menu__list__item[view="myProfile"]').click(function(e) {
						e.preventDefault();
						DOMEventHandlerController.menuButtonClick('../../views/myProfileView.html', [displayCurrentUserProfile]);
					});
			});
	}
	
	function displayCurrentUserProfile() {
		globals.everlive.Users.currentUser()
			.then(function(user) {
				return user.result
			})
			.then(function(currentUser) {
				var profileTemplateHTML = $('#profile-template').html(),
					profileTemplate = compileHandlebarsTemplate(profileTemplateHTML);
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
						DOMEventHandlerController.editImageButtonClick();
						DOMEventHandlerController.uploadImageButtonClick();
					});
			});
	};
	
	function removeCurrentUserFromMenu () {
		$('.menu__list__item[view="myProfile"]').remove();
		displayLogInOrLogOutCTA('Log in');
		$('.menu__list__item[view="register"]').css('display', 'block');
	}
	
	 function displayLogInOrLogOutCTA(cta) {
		if(cta === "Log in") {
			$('#menu__list__item__log-in').css('display', 'block');
			$('#menu__list__item__log-out').css('display', 'none');
		} else if (cta === "Log out") {
			$('#menu__list__item__log-out').css('display', 'block');
			$('#menu__list__item__log-in').css('display', 'none');
		}
	}
	
	function animateScrollToContent() {
		$('body').animate({scrollTop: $('.header').height()}, 400);
	}
	
	return {
		displayStatusMessage: displayStatusMessage,
		compileHandlebarsTemplate: compileHandlebarsTemplate,
		displayCurrentUserInMenu: displayCurrentUserInMenu,
		displayCurrentUserProfile: displayCurrentUserProfile,
		removeCurrentUserFromMenu: removeCurrentUserFromMenu,
		displayLogInOrLogOutCTA: displayLogInOrLogOutCTA,
		animateScrollToContent: animateScrollToContent
	};
}(jQuery))

export {
	DOMManipulationController
}