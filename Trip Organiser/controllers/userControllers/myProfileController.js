import 'jquery'
import { globals as globals } from "globals.js"

var isUserLoggedIn = globals.everlive.Users.currentUser() ? true : false;

function displayCurrentUserInMenu() {
	console.log('in');
	globals.everlive.Users.currentUser()
		.then(function (user) {
			return user.result.DisplayName;
		})
		.then(function (name) {
				var user = {
						name: name
					},
					template = '<li class="header_menu_list_item" id="my-profile"><a href="#" class="header_menu_list_item_link">Hello, {{name}}</a></li>',
					element = Handlebars.compile(template);	
					
				$('.navbar-right').append(element(user));
		});
}

export { displayCurrentUserInMenu }