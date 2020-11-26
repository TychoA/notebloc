export class Editor {

    // private members
    #container;
    #editor;

    /**
     *  Constructor.
     *  @param  Element Parent container.
     */
    constructor(parentElement) {

        // create a textarea
        this.#container = parentElement.appendChild(document.createElement('div'));
        this.#container.classList.add('editor');

        // and the editor
        this.#editor = new FroalaEditor('.editor', {
            height: '90%'
        });
    }

    /**
     *  Cleanup.
     */
    remove() {
        this.#container.remove();
    }
};
