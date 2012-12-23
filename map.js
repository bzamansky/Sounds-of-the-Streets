var map;
var geocoder;
var infowindow;

function initialize() {
//Initializes the map.

    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(40.713956,-74.377441),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
				  mapOptions);
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });

}

function placeMarker(location) {
//This allows you to print a marker.

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    infowindow = new google.maps.InfoWindow(
	{ content: "" +marker.position,
          size: new google.maps.Size(50,50)
	});
    google.maps.event.addListener(marker, 'click', function(){
	infowindow.open(map,marker);
	codeLatLng(marker);
    });
    
}

function removeMarker(){
    markersArray[markersArray.length-1].setMap(null);
}


function codeLatLng(marker) {
//This allows you to click on a marker and return it's address.

    var lat = marker.position["Ya"];
    var lng = marker.position["Za"];
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
	      return results[0].formatted_address;
          }
	}
       else {
          alert("Geocoder failed due to: " + status);
      }
    });

    return undefined;
}