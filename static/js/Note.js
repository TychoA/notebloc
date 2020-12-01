/**
 *  Class definition.
 */
export class Note {

    // private members
    #id;
    #name;
    #content;

    /**
     *  Constructor.
     *  @param  Number  Id of the note.
     */
    constructor(id) {
        this.#id = id;
        this.#name = '';
        this.#content = '';
    }

    /**
     *  Method to set the content of the note.
     *  @param  String  New content.
     */
    setContent(content) {
        this.#content = content;
    }

    /**
     *  Method to get the current content.
     *  @return String
     */
    getContent() {
        return this.#content;
    }

    /**
     *  Method to set the name of the note.
     *  @param  String  New name.
     */
    setName(name) {
        this.#name = name;
    }

    /**
     *  Method to get the name of the note.
     *  @return String
     */
    getName() {
        return this.#name;
    }

    /**
     *  Method to load the note.
     *  @return Promise
     */
    load() {

        // fetch this note
        return fetch('/note?id=' + this.#id).then(async (response) => {

            // get the data
            const data = await response.json();

            // update our internals
            this.#name = data[0];
            this.#content = data[1];
        });
    }

    /**
     *  Method to save this note.
     */
    save() {

        // if there's an id, we can update
        if (this.#id) this.#update();

        // otherwise, create a new note
        else this.#store();
    }

    /**
     *  Method to update this note as an existing note.
     */
    #update() {

        // get our id, name, and note
        const id = this.#id,
            name = this.#name,
            note = this.#content;

        // request to store the html
        return fetch('/note', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, note })

        // handle success
        }).then((success) => {

            // inform the client
            if (success) alertify.notify('Saved', 'success', 3);
            else alertify.notify('Could not be saved', 'error', 3);

        // handle error
        }, () => void alertify.notify('Could not be saved', 'error', 3));
    }

    /**
     *  Method to store this note as a new note.
     */
    #store() {

        // get the name and note
        const name = this.#name;
        const note = this.#content;

        // request to store the html
        return fetch('/notes', {
            method: 'POST',
            body: JSON.stringify({ name, note }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }

        // handle success
        }).then((id) => {

            // inform the user and expose the id
            alertify.notify('Saved', 'success', 3);

            // update our id
            this.#id = id;

        // handle error
        }, () => void alertify.notify('Could not be saved', 'error', 3));
    }
}
