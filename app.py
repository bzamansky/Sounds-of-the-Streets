import utils
import map_utils
import youtube
import json, urllib2
from flask import Flask, render_template, request


app = Flask(__name__)
app.secret_key="blah"
Last_key= "0946dbffa1b5b7ad9c4dc855be73398f"
Map_key = "AIzaSyDm3LFbtgPrB8jtcruyGlf9ED-tidYvYrA"

@app.route("/", methods = ["GET","POST"])
def home():
    if request.method == 'POST':
        address = request.form['location']
        return search(address)
    else:
        s = map_utils.source()
        address = ""
        return render_template("map.html", address=address, s=s)



@app.route("/update", methods = ["GET","POST"])
def update():
    address = request.args.get('address', "line goes here")
    useplace = request.args.get('useplace', False)
    de = ""
    writer = ""
    title = ""
    #print(address)
    
    listOfAddresses = []
    listOfAddresses = address.split(";")

    #print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    for place in listOfAddresses:
        print(place)
    #print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    song = utils.getSong2(Last_key,listOfAddresses)
    url = song[0]
    artist = song[1]
    vidId = youtube.makeParse(artist)
    num = len(vidId)
    #print vidId
    writer = song[2]
    title = song[3]
    if song[1] == "Rick Astley Never Gonna Give You Up":
        de = "We couldn't find a song for this location, so have this complementary song instead."
        num = 1
    else:
        de = ""
    r = {'address':listOfAddresses, 'url':url, 'artist':artist, 'vidId':vidId, 'de':de, 'writer':writer, 'title':title, 'num':num }
    return json.dumps(r)

@app.route("/search", methods = ["GET","POST"])
def search(address):
    names = []
    names.append(address)
    song = utils.getSong2(Last_key,names)
    url = song[0]
    artist = song[1]
    vidIds = youtube.makeParse(artist)
    r = {'address':names[0], 'url':url, 'artist':artist, 'vidId':vidIds }
    return json.dumps(r)

    
if __name__ == '__main__':
    app.run(debug = True, host="0.0.0.0", port = 7358)


