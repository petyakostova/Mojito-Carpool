import 'jquery'
import { DOMManipulationController } from './DOMManipulationController.js'

var DOMEventHandlerController = (function($){
	var DOMEventHandlerController = {};
	
	DOMEventHandlerController.buttonClickEventHandler = function(viewPath, methodDelegates) {
		function scrollToTopEventListener() {
			$('.scroll').click(function(){
				$('body').animate({scrollTop: 0}, 400);
			})
		}
		var $container = $('.container');
		
		if($(document).scrollTop() < ($('.header').height() / 2)) {
			DOMManipulationController.scrollToContent();
		}
		
		$container.load(viewPath, function(){
			if(methodDelegates) {
				for(var m in methodDelegates) {
					methodDelegates[m]();
				}
			}
			
			return false;
		});
	}
	
	
	DOMEventHandlerController.unloadEventHandler = function() {
		
	}
	
	return DOMEventHandlerController;
}(jQuery));

export { 
	DOMEventHandlerController
}