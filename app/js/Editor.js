/**
 *  Dependencies.
 */
import { Component } from './Component.js';
import { Note } from './Note.js';
import { throttle } from './throttle.js';

/**
 *  Class definition.
 */
export class Editor extends Component {

    // private members
    #editor;

    /**
     *  Constructor.
     *  @param  Element Parent container.
     *  @param  Number  Id of the note to open this editor with (optional).
     */
    constructor(parentElement, noteId) {

        // Call the parent
        super(parentElement);

        // Row of tools for the name input and removal button
        const tools = this.el.appendChild(document.createElement('div'));
        tools.classList.add('tools');

        // Add a field for setting the name
        const nameField = tools.appendChild(document.createElement('input'));
        nameField.setAttribute('placeholder', 'Enter a name (e.g. MyNote)');

        // listen to changes
        nameField.addEventListener('change', () => {

            // set the name and save the note
            note.setName(nameField.value);
            note.save();
        });

        // Add a button to remove this note
        const removeButton = tools.appendChild(document.createElement('i'));
        removeButton.classList.add('fi', 'fi-rr-trash', 'remove-icon');

        // Listen to when the user wants to remove it
        removeButton.addEventListener('click', () => {

            // Delete the note
            note.delete().then(alert);
        });

        // create a textarea
        const textarea = this.el.appendChild(document.createElement('div'));
        textarea.classList.add('editor');

        // create the note handler
        const note = new Note(noteId);

        // and the editor
        const editor = new FroalaEditor('.editor', {
            height: '90%',
            events: {
                'contentChanged': throttle(() => {
                    note.setContent(editor.html.get());
                    note.save();
                }, 1000),
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
};
