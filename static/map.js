var map;
var geocoder;
var infowindow;
var markersArray = [];
var selected;


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
    selected = marker;
    markersArray.push(marker);
    infowindow = new google.maps.InfoWindow(
	{ content: "" +marker.position,
          size: new google.maps.Size(50,50)
	});
    google.maps.event.addListener(marker, 'click', function(){
	selected = marker;
	infowindow.open(map,marker);
	codeLatLng(marker);
    });
    
}

function removeMarkers(){
    if(markersArray){
	for (i in markersArray){
	    markersArray[i].setMap(null);
	}
    }
}

function removeMark(){
    selected.setMap(null);
}

function codeLatLng(marker) {
//This allows you to click on a marker and return it's address.
    var address = "";
    var lat = marker.position["Ya"];
    var lng = marker.position["Za"];
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
	      address = results[0].formatted_address;
	      $.getJSON("/update", {address:address},function(data){
		  $("#address").text(data['address']);
		  var ref = $("<a></a>");
		  ref.attr('href',data['url']);
		  ref.text(data['url']);
		  $("#url").append(ref);
	      });  
          }
	}
       else {
          alert("Geocoder failed due to: " + status);
      }
    });
    
    return undefined;
}




$(document).ready(function(){
    $("#clear").click(removeMarkers);
    $("#remove").click(removeMark);
});