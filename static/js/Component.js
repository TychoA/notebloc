export class Component {

    // Private members
    #container;
    #emitter;

    /**
     *  Constructor.
     *  @param  Element Parent element.
     *  @param  String  Tag name of the component. Default is 'div'.
     */
    constructor(parentElement, tagName = 'div') {

        // Create the container
        this.#container = parentElement.appendChild(document.createElement(tagName));

        // Create the event emitter
        this.#emitter = mitt();
    }

    /**
     *  Getter to expose the container.
     *  @return Element
     */
    set el(nothing) { } // Readonly
    get el() { return this.#container; }

    /**
     *  Method to install an event listener.
     *  @param  String      Event to listen to.
     *  @param  Function    Callback to execute as listener.
     */
    on(eventName, callback) {
        this.#emitter.on(eventName, callback);
    }

    /**
     *  Method to uninstall an event listener.
     *  @param  String      Event to not listen to.
     *  @param  Function    Callback to remove as listener.
     */
    off(eventName, callback) {
        this.#emitter.off(eventName, callback);
    }

    /**
     *  Method to trigger an event with data.
     *  @param  String      Event to trigger.
     *  @param  Object      Data to pass with the event.
     */
    emit(eventName, data) {
        this.#emitter.emit(eventName, data);
    }

    /**
     *  Cleanup.
     */
    remove() {
        this.#emitter.all.clear();
        this.#container.remove();
    }
}
