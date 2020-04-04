/**
 * Components > Counter.
 * ------------------------------------------------------------------------------
 * Online counter functionality.
 *
 * @namespace counter
 */

/**
 * DOM selectors.
 */
const selectors = {
  counter: '[js-counter="number"]',
  days: '[js-counter="days"]',
};

/**
 * Create a new counter object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    counter: document.querySelector(selectors.counter),
    days: document.querySelector(selectors.days),
  };

  /**
   * Initialise component.
   */
  function init() {
    updateCounter();
  }

  /**
   * Update the counter.
   */
  function updateCounter() {
    let launch = nodeSelectors.counter.getAttribute('data-launch');
    launch = new Date(launch);
    const now = new Date();

    let difference = (now - launch);
    difference = Math.ceil(difference / 1000 / 60 / 60 / 24);

    nodeSelectors.counter.innerText = difference;

    if (difference === 1) {
      nodeSelectors.days.innerText = 'day';
    }
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
