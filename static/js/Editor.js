/**
 *  Dependencies.
 */
import { Note } from './Note.js';

/**
 *  Class definition.
 */
export class Editor {

    // private members
    #container;
    #editor;

    /**
     *  Constructor.
     *  @param  Element Parent container.
     *  @param  Number  Id of the note to open this editor with (optional).
     */
    constructor(parentElement, noteId) {

        // the container
        this.#container = parentElement.appendChild(document.createElement('div'));

        // add a field for setting the name
        const nameField = this.#container.appendChild(document.createElement('input'));
        nameField.setAttribute('placeholder', 'Enter a name (e.g. MyNote)');

        // listen to changes
        nameField.addEventListener('change', () => {

            // set the name and save the note
            note.setName(nameField.value);
            note.save();
        });

        // create a textarea
        const textarea = this.#container.appendChild(document.createElement('div'));
        textarea.classList.add('editor');

        // create the note handler
        const note = new Note(noteId);

        // and the editor
        const editor = new FroalaEditor('.editor', {
            height: '90%',
            events: {
                'contentChanged': function() {
                    note.setContent(this.html.get());
                    note.save();
                },
            }
        // initialization callback
        }, function() {

            // wait for the note to load
            note.load().then(() => {

                // set the content on the editor
                nameField.value = note.getName();
                editor.html.set(note.getContent());
            });
        });
    }

    /**
     *  Cleanup.
     */
    remove() {
        this.#container.remove();
    }
};
