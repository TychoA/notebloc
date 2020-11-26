// dependencies
import { Editor } from './js/Editor.js';

// wait for the document to load
window.addEventListener('load', function() {

    // get the app container
    const appContainer = document.getElementById('app');

    // load the note editor
    const editor = new Editor(appContainer);
});
