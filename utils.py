import json, urllib2

key = "0946dbffa1b5b7ad9c4dc855be73398f"

def getSong(k,name):
    #Gets the URL of a song
    #If there is no song for the name sent in, it rickrolls you.
    
    title = name.split()
    track = ""
    #the next line cuts out the first 2 parts of the address so we can see this works when you click on 42nd street
    #title = title[2:4]
    for item in title:
        track = track + item + "+"
    track = track[:-1]
    track = urllib2.quote(track)
    url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track="%s"&api_key=%s&format=json'%(track,k)
    print url
    request = urllib2.urlopen(url)
    result = json.loads(request.read())
    print result
    try:
        x = result["results"]["trackmatches"]["track"][0]["url"]
    except:
        x = "http://www.last.fm/music/Rick+Astley/_/Never+Gonna+Give+You+Up?ac=never+gonna+give+you+"
    return x
import json, urllib2


def getSong2(k,names):
    #Gets the URL of a song
    #If there is no song for the name sent in, it rickrolls you.
    for item in names:
        
        title = item.split()
        track = ""
   #the next line cuts out the first 2 parts of the address so we can see this works when you click on 42nd street
    #title = title[2:4]
        for item in title:
            track = track + item + "+"
        track = track[:-1]
        track = urllib2.quote(track)
        url = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track="%s"&api_key=%s&format=json'%(track,k)
        print url
        request = urllib2.urlopen(url)
        result = json.loads(request.read())
        print result
        try:
            x = result["results"]["trackmatches"]["track"][0]["url"]
            break
        except:
            x = "http://www.last.fm/music/Rick+Astley/_/Never+Gonna+Give+You+Up?ac=never+gonna+give+you+"
    return x

