import { user } from "/modules/User/User"
import { globals as globals } from "globals.js"
import 'jquery'

function registerUser(){
	var $submitRegistration = $('.input-group');
	console.log($('.registerUser').children()); 
	$submitRegistration.click(function(){
		console.log('Exoo');
		var $firstName = $('#firstNameInput').val();
		var newUser = Object.create(user).init('stamat', 'stamatpetrov@gmai.com', 'allabala', 'allabala', $firstName, 'Petrov', ' 32', 'Sofia');
		console.log(newUser);
	});
	
}

export { registerUser }