import 'jquery';

import { DOMManipulationController } from '../../controllers/DOMController/DOMManipulationController';

var user = (function($){
	
	function isValidUsername(value) {
		return /^[A-Za-z0-9]{4,30}$/g.test(value);
	}
	
	function isValidPassword(value) {
		return /^[A-Za-z0-9]{8,30}$/g.test(value);
	}
	
	function isValidEmail(value) {
		return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
	}
	
	function isValidName(value) {
		return /^[A-Za-z]{2,20}$/g.test(value)
	}
	
	function isValidAge(value) {
		return typeof +(value) === 'number' && +(value) >= 16 && +(value) <= 122;
	}

	var user = {
		init: function(username, email, password, firstName, lastName, age, city) {
			this.username = username;
			this.email = email;
			this.password = password;
			this.firstName = firstName;
			this.lastName = lastName;
			this.age = age;
			this.city = city;
			
			return this;
		}
	}
	
	Object.defineProperties(user, {
		username: {
			get: function() {
				return this._username;
			},
			set: function(value) {
				var invalidUsernameMessage = "Username must be between 4 and 30 and symbols long and must contain characters only";
				
				if(isValidUsername(value)) {
					this._username = value;
				} else {
					DOMManipulationController.displayInvalidDataMessage($('#input--username'), invalidUsernameMessage);
				}
			}
		},
		email: {
			get: function() {
				return this._email;
			},
			set: function(value) {
				var invalidEmailMessage = "Email must be a valid addres (example@mail.com).";
				
				if(isValidEmail(value)) {
					this._email = value;
				} else {
					DOMManipulationController.displayInvalidDataMessage($('#input--email'), invalidEmailMessage);
				}
			}
		},
		password: {
			get: function() {
				return this._password;
			},
			set: function(value) {
				var invalidPasswordMessage = "Password must be between 8 and 30 and symbols long and must contain characters, numbers or special symbols such as !@#$%^&*";
				
				if(isValidPassword(value)) {
					this._password = value;
				} else {
					DOMManipulationController.displayInvalidDataMessage($('#input--password'), invalidPasswordMessage);
					DOMManipulationController.displayInvalidDataMessage($('#input--password-repeated'), invalidPasswordMessage);
				}
			}
		},
		firstName: {
			get: function() {
				return this._firstName;
			},
			set: function(value) {
				var invalidFirstNameMessage = "First name must be between 2 and 20 and symbols long and must contain characters only";
				
				if(isValidName(value)) {
					this._firstName = value;
				} else {
					DOMManipulationController.displayInvalidDataMessage($('#input--first-name'), invalidFirstNameMessage);
				}
			}
		},
		lastName: {
			get: function() {
				return this._lastName;
			},
			set: function(value) {
				var invalidLastNameMessage = "Last name must be between 2 and 20 and symbols long and must contain characters only";
				
				if(isValidName(value)) {
					this._lastName = value;
				} else {
					DOMManipulationController.displayInvalidDataMessage($('#input--last-name'), invalidLastNameMessage);
				}
			}
		},
		age: {
			get: function() {
				return this._age;
			},
			set: function(value) {
				var invalidAgeMessage = "You must be over 16 to register for this site. And we know pretty damn well you're not older than 122, you joker.";
				
				if(isValidAge(value)) {
					this._age = value;
				} else {
					DOMManipulationController.displayInvalidDataMessage($('#input--age'), invalidAgeMessage);
				}
			}
		},
		city: {
			get: function() {
				return this._city;
			},
			set: function(value) {
				var invalidCityMessage = "City must be between 2 and 20 and symbols long and must contain characters only";
				
				if(isValidName(value)){
					this._city = value;
				} else {
					DOMManipulationController.displayInvalidDataMessage($('#input--city'), invalidCityMessage);
				}
			}
		}
	});
	
	return user;
}(jQuery));

export { user };