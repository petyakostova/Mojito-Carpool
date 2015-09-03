import 'jquery'
import { globals } from 'globals.js'

import { DOMEventHandlerController } from './DOMEventHandlerController'

import { currentUserController } from './../userControllers/currentUserController'

import { dbController } from './../databaseController'
 
var DOMManipulationController = (function($){
	
	function blurWrapper() {
		$('.wrapper').css({
                            'filter': 'blur(10px) drop-shadow(16px 16px 10px rgba(0,0,0,0.9))',
                            '-webkit-filter': 'blur(10px) drop-shadow(16px 16px 10px rgba(0,0,0,0.9))',
                            '-moz-filter': 'blur(10px)',
                            '-o-filter': 'blur(10px)',
                            '-ms-filter': 'blur(10px)'
                        });
	};
	
	function unblurWrapper() {
		$('.wrapper').css({
			'filter': 'none',
			'-webkit-filter': 'none',
			'-moz-filter': 'none',
			'-o-filter': 'none',
			'-ms-filter': 'none'
		})
	}
	
	function disableSubmitButton($button) {
		$button.css('pointer-events', 'none');
	}
	
	function displayStatusMessage(status, methodDelegates) {
		if(status === 'success') {
			$('.messagebox--state-error').css('display', 'none');
			$('.messagebox--state-success').css({'display': 'block',
												'opacity': 1});
			disableSubmitButton($('.form__field__input--type-submit'));
			blurWrapper();
			$('.btn__close').click(function(){
				DOMEventHandlerController.messageboxCloseButtonClick($('.messagebox--state-success'));				unblurWrapper();
			});
			if(methodDelegates) {
				globals.functions.executeMethodDelegates(methodDelegates);
			}
		} else if (status === 'error') {
			$('.messagebox--state-success').css('display', 'none');
			$('.messagebox--state-error').css({'display': 'block',
												'opacity': 1});
			blurWrapper();	
			$('.btn__close').click(function(){
				DOMEventHandlerController.messageboxCloseButtonClick($('.messagebox--state-error'));
				unblurWrapper();
			});
			
		}
	};
	
	function displayInvalidDataMessage($inputField, invalidDataMessage) {
		var $invalidDataAlert = $.parseHTML('<div class="messagebox--type--invalid-data">' +
												'<span class="btn__close">&#10006;</span>' +
												'<h3><strong>Warning!</strong> ' + invalidDataMessage + '</h3>' +  
											'</div>');
				
			$inputField.after($invalidDataAlert);
			setTimeout(function() {
				$('.alert').fadeOut(300);
			}, 10000);
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
	};
	
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
	};
	
	 function displayLogInOrLogOutCTA(cta) {
		if(cta === "Log in") {
			$('#menu__list__item__log-in').css('display', 'block');
			$('#menu__list__item__log-out').css('display', 'none');
		} else if (cta === "Log out") {
			$('#menu__list__item__log-out').css('display', 'block');
			$('#menu__list__item__log-in').css('display', 'none');
		}
	};
	
	function displayTrips() {
		var tripData = globals.everlive.data('Trip'),
			filter = new Everlive.Query(); 
			filter.where().gte('Date', Date.now());
			
			tripData.get()
				.then(function(data) {
					return data.result;
				})
				.then(function(trips) {
					var tripsCount = trips.length,
						tripsCountTemplate = '<span id="trips-count"> Currently there are {{count}} active trips.</span>',
						tripsCountTemplateAsDOMElement = compileHandlebarsTemplate(tripsCountTemplate);
						
						$('.find-trips_heading_subtitle').append(tripsCountTemplateAsDOMElement({count : tripsCount}));
						
					return trips;
				})
				.then(function(trips){
					var tripPreviewTemplate = $('#trip-preview__template').html(),
						tripPreviewTemplateAsDOMElement = compileHandlebarsTemplate(tripPreviewTemplate);
						
					$('.col-md-8').append(tripPreviewTemplateAsDOMElement({trips : trips}));
					
					$('.btn__redirect').each(function(i) {
						$('.btn__redirect').eq(i).click(function() {
							
							function displayCurrentTrip() {
								var currentTrip = trips[i],
									tripTemplate = $('#trip__template').html();
									globals.everlive.Users.getById(currentTrip.CreatedBy)
										.then(function(user){
										var tripTemplateAsDOMElement = compileHandlebarsTemplate(tripTemplate);
										
										$('.table').append(tripTemplateAsDOMElement({
											Date: currentTrip.Date,
											StartingPoint: currentTrip.StartingPoint,
											EndingPoint: currentTrip.EndingPoint,
											CreatedBy: user.result.DisplayName,
											WantPayment: currentTrip.WantPayment,
											TypeOfPayment: currentTrip.TypeOfPayment,
											AdditionalInformation: currentTrip.AdditionalInformation
										}));
										
										$('.btn__redirect').click(function() {
											DOMEventHandlerController.loadPartialView('../../views/findTripsView.html', [displayTrips]);
										})
									});
							}
							
							DOMEventHandlerController.loadPartialView('../../views/tripView.html', [displayCurrentTrip]);
						});
					});
				});
	}
	
	function animateScrollToContent() {
		$('body').animate({scrollTop: $('.header').height()}, 400);
	}
	
	return {
		disableSubmitButton: disableSubmitButton,
		displayStatusMessage: displayStatusMessage,
		displayInvalidDataMessage: displayInvalidDataMessage,
		compileHandlebarsTemplate: compileHandlebarsTemplate,
		displayCurrentUserInMenu: displayCurrentUserInMenu,
		displayCurrentUserProfile: displayCurrentUserProfile,
		removeCurrentUserFromMenu: removeCurrentUserFromMenu,
		displayLogInOrLogOutCTA: displayLogInOrLogOutCTA,
		displayTrips: displayTrips,
		animateScrollToContent: animateScrollToContent
	};
}(jQuery))

export {
	DOMManipulationController
}