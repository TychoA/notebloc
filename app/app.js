// dependencies
import { Editor } from './js/Editor.js';
import { Notes } from './js/Notes.js';
import { App } from './js/App.js';

// wait for the document to load
window.addEventListener('load', function() {

    // get the app container
    const app = new App(document.getElementById('app'));

    // Create a new router
    const router = new Navigo();

    // Install the main route
    router.on('/', () => {

        // Show the notes
        app.show(Notes, router);
        router.updatePageLinks();
    });

    // Install the new route
    router.on('/new', () => {

        // Show the editor
        app.show(Editor);
        router.updatePageLinks();
    });

    // Install the single note route
    router.on('/note/:id', (params) => {

        console.log(params);
    });

    // Resolve the router
    router.resolve();
});
