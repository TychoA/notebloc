/**
 *  Class definition.
 */
export class App {

    // private members
    #container;
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
         *  Home button.
         *  @var    Element
         */
        const homeButton = toolbar.appendChild(document.createElement('a'));
        homeButton.classList.add('button');
        homeButton.textContent = 'Home';
        homeButton.setAttribute('href', '/');
        homeButton.setAttribute('data-navigo', '');

        /**
         *  Content element.
         *  @var    Element
         */
        this.#content = this.#container.appendChild(document.createElement('div'));
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
