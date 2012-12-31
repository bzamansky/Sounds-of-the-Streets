import json, urllib2

key = "0946dbffa1b5b7ad9c4dc855be73398f"

def getSong(k,name):
    #Gets the URL of a song
    #If there is no song for the name sent in, it rickrolls you.
    
    title = name.split()
    track = ""
    for item in title:
        track = track + item + "+"
    track = track[:-1]
    track = urllib2.quote(track)
    url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track="%s"&api_key=%s&format=json'%(track,k)
    request = urllib2.urlopen(url)
    result = json.loads(request.read())
    try:
        x = result["results"]["trackmatches"]["track"][0]["url"]
    except:
        x = "http://www.last.fm/music/Rick+Astley/_/Never+Gonna+Give+You+Up?ac=never+gonna+give+you+"
    return x
