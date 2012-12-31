import utils
import map_utils
from flask import Flask
from flask import render_template


app = Flask(__name__)
app.secret_key="blah"
Last_key= "0946dbffa1b5b7ad9c4dc855be73398f"
Map_key = "AIzaSyDm3LFbtgPrB8jtcruyGlf9ED-tidYvYrA"

@app.route("/")
def home():
    s = map_utils.source();
    address = "line goes here"
    return render_template("map.html", address=address, s=s)



if __name__ == '__main__':
    app.run(debug = True, port = 5000)
