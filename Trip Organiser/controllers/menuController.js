import 'jquery';

import { registerUser } from "./registerUserController";
function menuController() {
	function reloadPage() {
		$('body').animate({scrollTop: $header.height()}, 400);
	}
	
	var $container = $('.container'), $header = $('.header'),
		$homeCTA = $('#home'),
		// $findTripsCTA = $('#find-trips'),
		// $myProfileCTA = $('#my-profile'),
		$registerCTA = $('#register');
		// $logInCTA = $('#log-in');
	
	$homeCTA.click(function() {
		$container.empty();
		$container.load('../views/home.html', reloadPage);	
	})
	
	$registerCTA.click(function() {
		$container.empty();
		$container.load('../views/registerUser.html', reloadPage);
		registerUser();
	});
	
};

export { menuController }