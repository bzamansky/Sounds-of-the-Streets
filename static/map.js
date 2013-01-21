var map;
var geocoder;
var infowindow;
var markersArray = [];
var selected;
var service;
var usePlaces;
var initialLocation;


function initialize() {
//Initializes the map.

    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(40.717704,-74.013897),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
				  mapOptions);
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
    service = new google.maps.places.PlacesService(map);
    usePlaces = false;
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
    if (usePlaces){
	var request = {
	    location: marker.position,
	    radius: '100'
	};
	service.nearbySearch(request, callback);
    }
    else{
	codeLatLng(marker);
    }
    //codeLatLng(marker);
    infowindow = new google.maps.InfoWindow(
	{ content: "" +marker.position,
          size: new google.maps.Size(50,50)
	});
    
    google.maps.event.addListener(marker, 'click', function(){
	selected = marker;
	//console.log(marker);
	infowindow.open(map,marker);
	//console.log(infowindow['content']);
	codeLatLng(marker);
    });


}

function callback(results,status){
    var address;				  
    if (status == google.maps.places.PlacesServiceStatus.OK) {
	address = results[0]['name'];
    }
    console.log("place");
    console.log(address);
    useplace = usePlaces;

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
	$("#de").empty();
	$("#de").append(data['de']);
	$("#writer").empty();
	$("#writer").append("Artist: ");
	$("#writer").append(data['writer']);
	$("#title").empty();
	$("#title").append("Title: ");
	$("#title").append(data['title']);
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
	    console.log("this is results[0].geometry.location");
	    console.log(results[0].geometry.location);
	    x[0] = results[0].geometry.location.Ya;
	    x[1] = results[0].geometry.location.Za;
	    x[2] = results[0].geometry.location;
	    placeMarker(x[2]);
	    map.setCenter(x[2]);
 	}
	else{
	    x = undefined;
	}
    });
    return x;
}

function markerAtAddress(){
    address = $("#textbox").attr("value");
    console.log(address);
    newAddress = addressToLatLng(address);
    console.log(address);
    console.log("this is newAddress");
    console.log(newAddress[2]);
    
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
	$("#de").empty();
	$("#de").append(data['de']);
	$("#writer").empty();
	$("#writer").append("Artist: ");
	$("#writer").append(data['writer']);
	$("#title").empty();
	$("#title").append("Title: ");
	$("#title").append(data['title']);
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
		
		for(var j = 1; j < 6; j++){
		    pickle = "";
		    if( j == 5 )
			pickle = pickle + results[0].address_components[j].long_name;
		    else
			pickle = pickle + results[0].address_components[j].long_name + ";";
		    //console.log(pickle);
		    address = address + pickle;
		}
		//console.log(address);
	    }
	    //address = hi;
	    $.getJSON("/update", {address:address},function(data){
		$("#address").empty();
		$("#address").append("Address or Place: ");
		$("#address").append(data['address']);
		$("#url").empty();
		$("#url").append("Song URL: ");
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
		$("#de").empty();
		$("#de").append(data['de']);
		$("#writer").empty();
		$("#writer").append(data['writer']);
		$("#title").empty();
		$("#title").append(data['title']);
	    }); 
	}
	else {
	    address = undefined;
	} 
    });

 
    return 0;
}


function getLocation(){
    if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(
	    function(position) {
		initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		console.log(initialLocation);
		placeMarker(initialLocation);
		map.setCenter(initialLocation);
	    }, 
	    function() { }
	);
    } 
    else{
	initialLocation = null;
	console.log("could not find location");
	return;
    }
   // placeMarker(initialLocation);
}





$(document).ready(function(){
    $("#clear").click(removeMarkers);
    $("#remove").click(removeMark);
    $("#submit").click(markerAtAddress);
    
    //so you can press enter to search
    $("#textbox").keypress( function(e){ if (e['keyCode'] == 13){ markerAtAddress(); } });
    
    $("#usePlaces").click(function() {usePlaces = true; console.log("places=true");});
    $("#useAddress").click(function() {usePlaces = false; console.log("places = false");});
    $("#getLoc").click(getLocation);
});