/**
 *  Class definition.
 */
export class App {

    // private members
    #container;
    #callback;
    #instance;
    #content;

    /**
     *  Constructor.
     *  @param  Element Parent element.
     */
    constructor(parentElement) {

        /**
         *  Element for encapsulating the app.
         *  @var    Element
         */
        this.#container = parentElement.appendChild(document.createElement('div'));
        this.#container.classList.add('app');

        /**
         *  Go back callback.
         *  @var    Function
         */
        this.#callback = () => { };

        /**
         *  Instance installed on the content.
         *  @var    mixed
         */
        this.#instance = null;

        /**
         *  Toolbar for go back button.
         *  @var    Element
         */
        const toolbar = this.#container.appendChild(document.createElement('div'));
        toolbar.classList.add('toolbar');

        /**
         *  Go back button.
         *  @var    Element
         */
        const goBackButton = toolbar.appendChild(document.createElement('button'));
        goBackButton.textContent = 'Go back';
        goBackButton.addEventListener('click', () => {

            // run the callback
            this.#callback();
        });

        /**
         *  Content element.
         *  @var    Element
         */
        this.#content = this.#container.appendChild(document.createElement('div'));
    }

    /**
     *  Method to install a goback callback.
     *  @param  Function    Callback.
     */
    onback(callback) {
        this.#callback = callback;
    }

    /**
     *  Method to show a class on the content.
     *  @param  Function    Constructor.
     *  @param  variadic    Arguments.
     *  @return mixed
     */
    show(Instance, ...args) {

        // remove the old instance
        if (this.#instance) this.#instance.remove();

        // create the instance
        this.#instance = new Instance(this.#content, ...args);

        // expose the instance
        return this.#instance;
    }

    /**
     *  Cleanup.
     */
    remove() {
        this.#container.remove();
    }
}
