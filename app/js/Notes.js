/**
 *  Class definition.
 */
export class Notes {

    // private members
    #container;

    /**
     *  Constructor.
     *  @param  Element Parent element.
     */
    constructor(parentElement, router) {

        /**
         *  Element for showing the notes.
         *  @var    Element.
         */
        this.#container = parentElement.appendChild(document.createElement('div'));
        this.#container.classList.add('notes');

        // load all notes
        fetch('/notes').then(async (response) => {

            // get the notes
            const data = await response.json();

            // Preview link
            const previewLink = this.#container.appendChild(document.createElement('a'));
            previewLink.setAttribute('href', '/new');
            previewLink.setAttribute('data-navigo', '');
            previewLink.classList.add('preview-new');

            // create a preview
            const preview = previewLink.appendChild(document.createElement('div'));

            // add the name
            const name = preview.appendChild(document.createElement('h1'));
            name.textContent = '+ create new note';

            // add all notes
            for (let note of data) {

                // Preview link
                const previewLink = this.#container.appendChild(document.createElement('a'));
                previewLink.setAttribute('href', '/note/'+note[0]);
                previewLink.setAttribute('data-navigo', '');
                previewLink.classList.add('preview');

                // create a preview
                const preview = previewLink.appendChild(document.createElement('div'));

                // add the name
                const name = preview.appendChild(document.createElement('h1'));
                name.textContent = note[1];
            }
        });
    }

    /**
     *  Cleanup.
     */
    remove() {
        this.#container.remove();
    }
}
