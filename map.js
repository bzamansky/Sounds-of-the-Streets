var map;
var marker;

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
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
    var infowindow = new google.maps.InfoWindow(
	{ content: "" +marker.position,
          size: new google.maps.Size(50,50)
	});
    google.maps.event.addListener(marker, 'click', function() {
	codeLatLng();
	infowindow.open(map,marker);
    });
    
}

function codeLatLng() {
    var input = document.getElementById("latlng").value;
    var latlngStr = input.split(",");
    var lat = parseFloat(latlngStr[0]);
    var lng = parseFloat(latlngStr[1]);
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
	    console.log(results);
          if (results[1]) {
              console.log(results);
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
          }
	}
       else {
          alert("Geocoder failed due to: " + status);
      }
    });
}