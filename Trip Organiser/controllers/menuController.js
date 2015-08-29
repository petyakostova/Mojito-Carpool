import 'jquery';
import { register } from "./userControllers/registerController";
import { logIn } from "./userControllers/logInController"

var $container = $('.container');

function reloadPage() {
	$('body').animate({scrollTop: $('.header').height()}, 400);
}

function scrollToTopEventListener() {
	$('.scroll').click(function(){
		$('body').animate({scrollTop: 0}, 400);
	})
}


function buttonClickEventHandler(viewPath, methodDelegates) {
	$container.empty();
	$container.load(viewPath, function(){
		if(methodDelegates) {
			for(var m in methodDelegates) {
				methodDelegates[m]();
			}
		}
		reloadPage();
		scrollToTopEventListener();
	});
}

function menuController() {
	$('#home').click(function() {
		buttonClickEventHandler('../views/home.html')
	});
	$('#register').click(function() {
		buttonClickEventHandler('../views/registerView.html', [register])
	});
	$('#log-in').click(function(){
		buttonClickEventHandler('../views/logInView.html', [logIn]);
	});
};


export { menuController, buttonClickEventHandler }