/**
 *  Class definition.
 */
export class Notes {

    // private members
    #container;
    #callback;

    /**
     *  Constructor.
     *  @param  Element Parent element.
     */
    constructor(parentElement) {

        /**
         *  Element for showing the notes.
         *  @var    Element.
         */
        this.#container = parentElement.appendChild(document.createElement('div'));
        this.#container.classList.add('notes');

        // dummy callback
        this.#callback = () => { };

        // load all notes
        fetch('/notes').then(async (response) => {

            // get the notes
            const data = await response.json();

            // click handler
            const click = (data) => () => {

                // run the callback
                this.#callback(data);
            };

            // add all notes
            for (let note of data) {

                // create a preview
                const preview = this.#container.appendChild(document.createElement('div'));
                preview.classList.add('preview');

                // add the name
                const name = preview.appendChild(document.createElement('h1'));
                name.textContent = note[1];

                // listen to clicks on the preview
                preview.addEventListener('click', click(note));
            }
        });
    }

    /**
     *  Method to install an onclick callback.
     *  @param  Function    Callback.
     */
    onclick(callback) {

        // install the callback
        this.#callback = callback;
    }

    /**
     *  Cleanup.
     */
    remove() {
        this.#container.remove();
    }
}
