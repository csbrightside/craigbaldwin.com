/**
 * Components > Accordion.
 * ------------------------------------------------------------------------------
 * Accordion with open/close functionality.
 *
 * @namespace accordions
 */
import cssClasses from '../helpers/cssClasses';
import {on} from '../helpers/utils';

/**
 * DOM selectors.
 */
const selectors = {
  container: '[js-accordion="container"]',
  button: '[js-accordion="button"]',
  content: '[js-accordion="content"]',
};

/**
 * Create a new accordion object.
 * @param {String} id - Containing element selector.
 */
export default (id) => {

  /**
   * DOM node selectors.
   */
  const namespace = document.querySelector(id);

  const nodeSelectors = {
    container: [...namespace.querySelectorAll(selectors.container)],
    button: [...namespace.querySelectorAll(selectors.button)],
    content: [...namespace.querySelectorAll(selectors.content)],
  };

  /**
   * Initialise component.
   */
  function init() {
    openAccordion(nodeSelectors.container[0]);
    setEventListeners();
  }

  /**
   * Set event listeners.
   */
  function setEventListeners() {
    nodeSelectors.button.forEach((element) => {
      on('click', element, (event) => handleButtonClick(event.target));
    });
  }

  /**
   * Handles accordion button click.
   * @param {HTMLElement} target - Click target.
   */
  function handleButtonClick(target) {
    const container = target.closest(selectors.container);

    if (container.classList.contains(cssClasses.active)) {
      closeAccordion(container);
      return;
    }

    closeOtherAccordions(container);
    openAccordion(container);
  }

  /**
   * Closes other accordions.
   */
  function closeOtherAccordions(target) {
    nodeSelectors.container.forEach((element) => {
      if (element === target) {
        return;
      }

      closeAccordion(element);
    });
  }

  /**
   * Closes an accordion.
   * @param {HTMLElement} element - Accordion container.
   */
  function closeAccordion(element) {
    element.classList.remove(cssClasses.active);
    element.querySelector(selectors.button).setAttribute('aria-expanded', false);
    element.querySelector(selectors.content).setAttribute('aria-hidden', true);
  }

  /**
   * Opens an accordion.
   * @param {HTMLElement} element - Accordion container.
   */
  function openAccordion(element) {
    element.classList.add(cssClasses.active);
    element.querySelector(selectors.button).setAttribute('aria-expanded', true);
    element.querySelector(selectors.content).setAttribute('aria-hidden', false);
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
