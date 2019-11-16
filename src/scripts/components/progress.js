/**
 * Components > Progress.
 * ------------------------------------------------------------------------------
 * Mountains progress bar functionality.
 *
 * @namespace progress
 */
import {CountUp} from 'countup.js';

import cssClasses from '../helpers/cssClasses';

/**
 * DOM selectors.
 */
const selectors = {
  progressBar: '[js-map="progressBar"]',
  count: '[js-map="count"]',
  total: '[js-map="total"]',
};

/**
 * Create a new header object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    progressBar: document.querySelector(selectors.progressBar),
    count: document.querySelector(selectors.count),
    total: document.querySelector(selectors.total),
  };

  /**
   * Initialise component.
   */
  function init() {
    updateProgress();
  }

  /**
   * Update the progress bar and count.
   */
  function updateProgress() {
    const mountains = nodeSelectors.count.getAttribute('data-value');
    const total = nodeSelectors.total.getAttribute('data-value');

    const countUp = new CountUp(nodeSelectors.count, mountains, {
      duration: 1.2,
      useEasing: false,
    });

    if (!countUp.error) {
      nodeSelectors.count.classList.add(cssClasses.active);
      countUp.start();
    }

    const completion = `${((mountains / total) * 100)}%`;

    nodeSelectors.progressBar.style.width = completion;
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
