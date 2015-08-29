import 'jquery'
import { buttonClickEventHandler } from "/controllers/menuController"
import { register } from "./registerController.js"
import { displayCurrentUserInMenu } from "./myProfileController"
import { globals as globals } from "globals.js"

function logIn() {
	$('.log-in_input-submit').click(function() {
		logInHandler();
	});
	
	$('#redirect_btn').click(function () {
		buttonClickEventHandler('../views/registerView.html', [register]);
	});
}

function logInHandler() {
	var username = $('#usernameInput').val(),
		password = $('#passwordInput').val();
	
	globals.everlive.authentication.login(
		username,
		password,
		function () {
			displayCurrentUserInMenu();
			$('.log-in-user-error').css("display", "none");
			$('.log-in-user-success').css("opacity", 1);
		}, function () {
			$('.log-in-user-success').css("display", "none");
			$('.log-in-user-error').css("opacity", 1);
		}
	);
}

export { logIn }