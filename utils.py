import json, urllib2

key = "0946dbffa1b5b7ad9c4dc855be73398f"

def getSong(k,name):
    title = name.split()
    track = ""
    for item in title:
        track = track + item + "+"
    track = track[:-1]
    
    url = "http://ws.audioscrobbler.com/2.0/?method=track.search&track=%s&api_key=%s&format=json"%(track,k)
    request = urllib2.urlopen(url)
    result = json.loads(request.read())
    return result["results"]["trackmatches"]["track"][0]["url"]



