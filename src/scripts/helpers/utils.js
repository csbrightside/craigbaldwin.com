/**
 * Helper: Utils
 * ------------------------------------------------------------------------------
 * Frame utility functions.
 *
 * @namespace utils
 */

/**
 * Shortcut function to add an event listener.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {String} event - The event type.
 * @param {Node} elem - The element to attach the event to (optional, defaults to window).
 * @param {Function} callback - The callback to run on the event.
 * @param {Boolean} capture - If true, forces bubbling on non-bubbling events.
 */
export function on(event, elem = window, callback, capture = false) {

  /**
   * If only a string is passed into the element parameter.
   */
  if (typeof elem === 'string') {
    document.querySelector(elem).addEventListener(event, callback, capture);
    return;
  }

  /**
   * If an element is not defined in parameters, then shift callback across.
   */
  if (typeof elem === 'function') {
    window.addEventListener(event, elem);
    return;
  }

  /**
   * Default listener.
   */
  elem.addEventListener(event, callback, capture);
}

/**
 * Debounce functions for better performance.
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {Function} fn - The function to debounce.
 */
export function debounce(fn) {
  // Setup a timer
  let timeout;

  // Return a function to run debounced
  return function() {

    // Setup the arguments
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function() {
      fn.apply(this, args);
    });
  };
}

/**
 * Determine page handle to load correct JS.
 */
export function pageHandle() {
  return document.querySelector('[js-page="handle"]').getAttribute('content');
}
