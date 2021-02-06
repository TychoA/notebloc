# dependencies
import webbrowser
from threading import Timer
from db import Database

# set up flask app
from flask import Flask, render_template, jsonify, request
port = 5000
app = Flask(__name__, static_folder='app', static_url_path='/app')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

@app.route('/api/note', methods=['GET', 'PUT'])
def note():

    # create a new database handler
    db = Database()

    # handle get request
    if request.method == "GET":

        # expose the note
        return jsonify(db.get_note(request.args.get('id')))

    # handle put request
    if request.method == "PUT":

        # get the post data and the note
        data = request.get_json()
        note = db.get_note(data['id'])

        # update the note
        db.set_note(
            data['id'],
            data['name'] if 'name' in data else note[0],
            data['note'] if 'note' in data else note[1]
        )

        # inform the client about the success
        return jsonify(True)

@app.route('/api/notes', methods=['GET', 'POST', 'DELETE'])
def notes():

    # create a new database handler
    db = Database()
    
    # handle get request
    if request.method == "GET":
        return jsonify(db.get_notes())

    # handle post request
    if request.method == "POST":

        # get the post data
        data = request.get_json()

        # create a new note
        db.add_note(
            data['name'] if 'name' in data else '',
            data['note'] if 'note' in data else ''
        )

        # and expose the last note's id
        return jsonify(db.get_notes()[-1][0])

    # Handle delete request
    if request.method == 'DELETE':

        # Get the delete data
        data = request.get_json()

        # Delete the found note
        db.delete_note(data['id'])
        return ('', 204)

def open_browser():
    webbrowser.open_new(f'http://127.0.0.1:{port}/')

# run as main
if __name__ == "__main__":

    # open the browser and start the app
    # Timer(1, open_browser).start()
    app.run(port=port)
