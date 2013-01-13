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
    removeMarkers();
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    selected = marker;
    markersArray.push(marker);
    codeLatLng(marker);
    infowindow = new google.maps.InfoWindow(
	{ content: "" +marker.position,
          size: new google.maps.Size(50,50)
	});
    google.maps.event.addListener(marker, 'click', function(){
	selected = marker;
	console.log(marker);
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


function addressToLatLng(address){
    var x = [];
    geocoder.geocode( {'address':address}, function(results, status){
	if (status == google.maps.GeocoderStatus.OK){
	    console.log(results[0].geometry.location);
	    x[0] = results[0].geometry.location.Ya;
	    x[1] = results[0].geometry.location.Za;
	    x[2] = results[0].geometry.location;
 	}
	else{
	    alert("Geocode was not successful for the following reason: " + status)
	    x = undefined;

	}
    });
    return x;
}

function markerAtAddress(){
    address = $("#textbox").attr("value");
    console.log(address);
    newAddress = addressToLatLng(address);
    console.log(newAddress);
    var lat = newAddress[0];
    var lng = newAddress[1];
    var latlng = new google.maps.LatLng(lat, lng);
    removeMarkers();
    var marker = new google.maps.Marker({
        position: newAddress[2],
        map: map,
	center: latlng
    });  

    google.maps.event.addListener(marker, 'click', function(){
	selected = marker;
	console.log(marker);
	infowindow.open(map,marker);
	codeLatLng(marker);
    });
    $.getJSON("/update", {address:address},function(data){
	$("#address").html(data['address']);
	$("#url").empty();
	var ref = $("<a></a>");
	ref.attr('href',data['url']);
	ref.text(data['url']);
	$("#url").append(ref);
	$("#AT").empty();
	$("#AT").append(data['artist']);
	$("#vidId").empty();
	$("#vidId").append(data['vidId']);
	addVidList(data['vidId']);
	addVideo(data['vidId'][0]);
    });  

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
              //infowindow.open(map, marker);
	      //address = results[0].formatted_address;

	      hi = [];
	      for (var i = 0; i < results.length; i++){
		  hi[i] = results[i].formatted_address;
		  address = address + results[i].formatted_address + '#';
		  console.log(hi[i]);
	      }
	      //address = hi;
	      
	      $.getJSON("/update", {address:address},function(data){
		  $("#address").html(data['address']);
		  $("#url").empty();
		  var ref = $("<a></a>");
		  ref.attr('href',data['url']);
		  ref.text(data['url']);
		  $("#url").append(ref);
		  $("#AT").empty();
		  $("#AT").append(data['artist']);
		  $("#vidId").empty();
		  $("#vidId").append(data['vidId']);
		  addVidList(data['vidId']);
		  addVideo(data['vidId'][0]);
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
    $("#submit").click(markerAtAddress);
});