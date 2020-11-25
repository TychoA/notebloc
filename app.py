# dependencies
import webbrowser
from threading import Timer
from db import Database

# set up flask app
from flask import Flask, render_template
port = 5000
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/notes')
def notes():
    pass

def open_browser():
    webbrowser.open_new(f'http://127.0.0.1:{port}/')

# run as main
if __name__ == "__main__":

    # open the browser and start the app
    Timer(1, open_browser).start()
    app.run(port=port)
