# dependencies
import webbrowser
from threading import Timer
from db import Database

# set up flask app
from flask import Flask, render_template, jsonify, request
port = 5000
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/notes', methods=['GET', 'POST'])
def notes():

    # create a new database handler
    db = Database()
    
    # handle get request
    if request.method == "GET":
        return jsonify(db.get_notes())

    # handle post request
    if request.method == "POST":
        data = request.get_json()
        note = ''

        # we need a name
        if 'name' not in data:
            # throw an error
            pass

        # update the note
        if 'note' in data:
            note = data['note']

        # create a new note
        db.add_note(data['name'], note)

def open_browser():
    webbrowser.open_new(f'http://127.0.0.1:{port}/')

# run as main
if __name__ == "__main__":

    # open the browser and start the app
    Timer(1, open_browser).start()
    app.run(port=port)
