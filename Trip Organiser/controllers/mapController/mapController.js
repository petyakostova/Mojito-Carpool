var mapController = (function(){
	var maps = [];
	function setMap(id, center, zoom) {
		var map = new google.maps.Map(document.getElementById(id), {
			center: center,
			zoom: 18
		});
		
		return map;
	};
	
	function getMap (id) {
		return maps[id];
	}
	
	
	function initialize () {
		var geocoder = new google.maps.Geocoder();
		
		function pinLocation(latitude, longitude, startingPointMarkerText) {
			var startingPointLatLng = new google.maps.LatLng(latitude, longitude),
				endingPointLatLng = new google.maps.LatLng(42.1361141, 24.742476),
				startingPointMarker = new google.maps.Marker({
					position: startingPointLatLng,
					draggable: true,
    				animation: google.maps.Animation.DROP,
				}),
				endingPointMarker = new google.maps.Marker({
					position: endingPointLatLng,
					draggable: true,
					animation: google.maps.Animation.DROP
				}),
				infoWindow = new google.maps.InfoWindow({
					content: startingPointMarkerText
				}),
				startingPointMap = setMap('map--starting-point', startingPointLatLng, 18),
				endingPointMap = setMap('map--ending-point', endingPointLatLng, 6);
				maps['map--starting-point'] = startingPointMap;
				maps['map--ending-point'] = endingPointMap;
			
			
			startingPointMarker.setMap(startingPointMap);
			startingPointMarker.addListener('dbclick', function() {
				var latLng = startingPointMap.getBounds(),
					lng = latLng.Ea.G,
					lat = latLng.Ja.G;
					
				codeLatLng($('#input--starting-point'), lat, lng);
			});
			infoWindow.open(startingPointMap, startingPointMarker);
			
			
			endingPointMarker.setMap(endingPointMap);
			endingPointMarker.addListener('dbclick', function() {
				var latLng = endingPointMap.getBounds(),
					lng = latLng.Ea.G,
					lat = latLng.Ja.G;
					
				codeLatLng($('#input--ending-point'), lat, lng);
			});
		}
		
		function geoSuccess(position) {
			pinLocation(position.coords.latitude, position.coords.longitude, "<h5 style=\"text-align: center\">Currently you are here</h5>");	
		};
		
		function geoError() {
			pinLocation(42.6509798, 23.3792025, "<h5 style=\"text-align: center\">Could not find your . So I dropped you off at Telerik Academy</h5>"); 			
		}
				
		if(navigator.geo) {
			navigator.geo.getCurrentPosition(geoSuccess, geoError);
		} else {
			pinLocation(42.6970783,23.3218784, "<h5 style=\"text-align: center\">Geo is not supported by your browser. Welcome to the center of Sofia!</h5>");
		}
		
		function codeLatLng($input, lat, lng) {
			var latlng = new google.maps.LatLng(lat, lng);
			geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					for (var i=0; i<results[0].address_components.length; i++) {
						for (var b=0;b<results[0].address_components[i].types.length;b++) {
							if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
								city= results[0].address_components[i];
								break;
							}
						}
					}
				
					$input.val(city.long_name);
				} else {
					alert("No results found");
				}
			} else {
				alert("Geocoder failed due to: " + status);
				}
			});
		}
	}
	
	return {
		initialize: initialize
	}
}());

export {
	mapController
}