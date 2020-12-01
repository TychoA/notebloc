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

        // create a textarea
        this.#container = parentElement.appendChild(document.createElement('div'));
        this.#container.classList.add('editor');

        // create the note handler
        const note = new Note(noteId);

        // and the editor
        const editor = new FroalaEditor('.editor', {
            height: '90%',
            events: {
                'contentChanged': function() {
                    note.setContent(this.html.get());
                },
                'keydown': function(event) {
                    if (event.key == 's' && event.ctrlKey) note.save();
                }
            }
        // initialization callback
        }, function() {

            // wait for the note to load
            note.load().then(() => {

                // set the content on the editor
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
