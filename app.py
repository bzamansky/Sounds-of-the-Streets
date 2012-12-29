import utils
from flask import Flask
from flask import render_template


app = Flask(__name__)
app.secret_key="blah"
key= "0946dbffa1b5b7ad9c4dc855be73398f"

@app.route("/")
def home():
    address = "line goes here"
    return render_template("map.html", address=address)



if __name__ == '__main__':
    app.run(debug = True, port = 5000)
