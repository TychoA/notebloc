export function throttle(callback, timeout) {

    // Define a flag that indicates the timer is throttled
    let throttled = false;

    // Expose the actual function that we want to throttle
    return (...args) => {

        // Stop if we are throttled
        if (throttled) return;

        // Call the callback
        callback(...args);

        // We are throttled
        throttled = true;

        // Create a new timer
        setTimeout(() => {

            // Reset the throttled flag
            throttled = false;
        }, timeout);
    };
};
