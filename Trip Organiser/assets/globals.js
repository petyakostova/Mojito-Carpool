var globals = {
	everlive: new Everlive({
			apiKey: "FzvrWJlpUwPSsEBL",
			scheme: "https",
			authentication: {
				persist: true,
				onAuthenticationRequired: function() {
					alert('Your access token has expired. Please log in.');
				}
			}
		}),
	googleMapsApiKey: "AIzaSyCP-eA0mFSfcp4SHUSwt9AJngiRbrqsbeU",
	functions: {
		executeMethodDelegates: function(delegates) {
			for(var d in delegates) {
				delegates[d]();
			}
		},
		displayLoader: function() {
			$('.loader').show();
		},
		hideLoader: function() {
			$('.loader').hide();
		}
	}
}

export { globals }