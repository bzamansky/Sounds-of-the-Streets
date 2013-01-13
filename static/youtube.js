

listOfVids = [];
i = 0;


function makeVidPlaylist(){
    
    listOfVids = ["FavUpD_IjVY","qybUFnY7Y8w"];
    i = 0;
    $("#nextVideo").click(function(){console.log(i);console.log("pressed"); $("#player").attr("src","http://www.youtube.com/embed/" + listOfVids[i] + "?enablejsapi=1&origin=http://example.com"); i = i+1;});
}  

function addVideo(vidId){
    $("#player").attr("src","http://www.youtube.com/embed/"+ vidId + "?enablejsapi=1&origin=http://example.com")
}

function addVidList(vidId){
    listOfVids = vidId;
    i = 0;
}

function nextVid(){
    $("#nextVideo").click(function(){console.log(i);console.log("pressed"); $("#player").attr("src","http://www.youtube.com/embed/" + listOfVids[i] + "?enablejsapi=1&origin=http://example.com"); i = i+1;});
}

$(document).ready(function(){
    $("#nextVideo").click(nextVid);
});
