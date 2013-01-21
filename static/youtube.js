

listOfVids = [];
i = 0;


function makeVidPlaylist(){
    
    listOfVids = ["a8O3IkBgubc","FavUpD_IjVY","qybUFnY7Y8w"];
    i = 0;
    $("#nextVideo").click(function(){console.log(i);console.log("pressed"); $("#player").attr("src","http://www.youtube.com/embed/" + listOfVids[i] + "?autoplay=1&enablejsapi=1&origin=http://example.com"); i = i+1;});
}  

function addVideo(vidId){
    $("#player").attr("src","http://www.youtube.com/embed/"+ vidId + "?autoplay=1&enablejsapi=1&origin=http://example.com")
}

function addVidList(vidId){
    listOfVids = vidId;
    i = 0;
}

function nextVid(){
    i = i + 1;
    if (i >= listOfVids.length){
	i = listOfVids.length;
    }
    $("#nextVideo").click(function(){console.log(i);console.log("pressed"); $("#player").attr("src","http://www.youtube.com/embed/" + listOfVids[i] + "?autoplay=1&enablejsapi=1&origin=http://example.com");});
}

function prevVid(){
    i = i-1
    if (i <= 0){
	i = 0;
    }
    $("#prevVideo").click(function(){
	console.log(i);console.log("pressed");
	$("#player").attr("src","http://www.youtube.com/embed/" + listOfVids[i] + "?autoplay=1&enablejsapi=1&origin=http://example.com"); });
				
}

$(document).ready(function(){
    $("#nextVideo").click(nextVid);
    $("#prevVideo").click(prevVid);
});
