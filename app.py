import utils
import map_utils
import youtube
import json, urllib2
from flask import Flask, render_template, request


app = Flask(__name__)
app.secret_key="blah"
Last_key= "0946dbffa1b5b7ad9c4dc855be73398f"
Map_key = "AIzaSyDm3LFbtgPrB8jtcruyGlf9ED-tidYvYrA"

@app.route("/", methods = ["GET"])
def home():
    s = map_utils.source()
    address = "default"
    return render_template("map.html", address=address, s=s)

@app.route("/update", methods = ["GET"])
def update():
    address = request.args.get('address',"line goes here")
    names = address.split('#')
    song = utils.getSong2(Last_key,names)
    print song
    url = song[0]
    artist = song[1]
    r = {'address':names[0], 'url':url, 'artist':artist }
    return json.dumps(r)
    
if __name__ == '__main__':
    app.run(debug = True, port = 5000)


#just need another line for a sec
