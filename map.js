var map;
var geocoder;
var infowindow;

function initialize() {
    geocoder = new google.maps.Geocoder();
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
    infowindow = new google.maps.InfoWindow(
	{ content: "" +marker.position,
          size: new google.maps.Size(50,50)
	});
    google.maps.event.addListener(marker, 'click', function() {
	codeLatLng(marker);
//	infowindow.open(map,marker);
    });
    
}

function codeLatLng(marker) {
    console.log( marker.position["Ya"]);
    console.log(marker.position["Za"]);
//    var input = marker.position;
//    var latlngStr = input.split(",");
    var lat = marker.position["Ya"];
    var lng = marker.position["Za"];
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
              console.log(results[1]);
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
          }
	}
       else {
          alert("Geocoder failed due to: " + status);
      }
    });
}