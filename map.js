var map;
var geocoder;

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(40.713956,-74.377441),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
				  mapOptions);
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    var infowindow = new google.maps.InfoWindow(
	{ content: "" +marker.position,
          size: new google.maps.Size(50,50)
	});
    google.maps.event.addListener(marker, 'click', function() {
	codeLatLng();
    });
    
}

function removeMarker(){
    markersArray[markersArray.length-1].setMap(null);
}

