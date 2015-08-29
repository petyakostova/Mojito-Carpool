import 'jquery';
import { registerUser } from "./registerUserController";

function reloadPage() {
	$('body').animate({scrollTop: $('.header').height()}, 400);
}

function scrollToTopEventListener() {
	$('.scroll').click(function(){
		$('body').animate({scrollTop: 0}, 400);
	})
}

function menuController() {
	var $container 	  = $('.container'),
		$homeCTA 	  = $('#home'),
		$findTripsCTA = $('#find-trips'),
		$myProfileCTA = $('#my-profile'),
		$registerCTA  = $('#register'),
		$logInCTA 	  = $('#log-in');
	
	$homeCTA.click(function() {
		$container.empty();
		$container.load('../views/home.html', function() {
					reloadPage();
					scrollToTopEventListener();
				});	
	})
	
	$registerCTA.click(function() {
		$container.empty();
		$container.load('../views/registerUser.html', function(){
				reloadPage();
				scrollToTopEventListener();
				registerUser();
			});
	});
};


export { menuController }