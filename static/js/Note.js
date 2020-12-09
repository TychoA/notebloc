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

        // if there's no note, resolve immediately
        if (!this.#id) return new Promise((resolve) => {
            resolve();
        });

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

        // If there's an id, update the note, otherwise store it
        return this.#id ? this.#update() : this.#store();
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
            body: JSON.stringify({ id, name, note })
        });
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
        }).then(async (response) => {

            // Set the id
            this.#id = await response.json();
        });
    }
}
