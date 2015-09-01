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
	googleMapsApiKey: "AIzaSyCP-eA0mFSfcp4SHUSwt9AJngiRbrqsbeU"
}

export { globals }