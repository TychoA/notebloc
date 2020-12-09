// dependencies
import { Editor } from './js/Editor.js';
import { Notes } from './js/Notes.js';
import { App } from './js/App.js';
import { throttle } from './js/throttle.js';

// wait for the document to load
window.addEventListener('load', function() {

    // get the app container
    const app = new App(document.getElementById('app'));

    // show notes
    const showNotes = () => {

        // create the notes
        const notes = app.show(Notes);

        // listen to the click
        notes.onclick((data) => {

            // install an editor
            app.show(Editor, data ? data[0] : undefined);
        });
    };

    // handle going back
    app.onback(showNotes);

    // show the notes
    showNotes();
});
