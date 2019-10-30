/**
 * Components > Header.
 * ------------------------------------------------------------------------------
 * Header menu functionality.
 *
 * @namespace header
 */
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

import cssClasses from '../helpers/cssClasses';
import {debounce, on} from '../helpers/utils';

/**
 * DOM selectors.
 */
const selectors = {
  menuButton: '[js-header="menuButton"]',
  navigationDrawer: '[js-header="navigationDrawer"]',
};

/**
 * Create a new header object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    menuButton: document.querySelector(selectors.menuButton),
    navigationDrawer: document.querySelector(selectors.navigationDrawer),
  };

  /**
   * Initialise component.
   */
  function init() {
    setEventListeners();
  }

  /**
   * Set event listeners.
   */
  function setEventListeners() {
    on('click', nodeSelectors.menuButton, () => handleMenuToggle());
    on('resize', () => debounce(closeNavigationDrawer()));
  }

  /**
   * Handle menu button click event.
   */
  function handleMenuToggle() {
    if (nodeSelectors.menuButton.classList.contains(cssClasses.active)) {
      closeNavigationDrawer();
      return;
    }

    openNavigationDrawer();
  }

  /**
   * Close the navigation drawer.
   */
  function closeNavigationDrawer() {
    nodeSelectors.menuButton.classList.remove(cssClasses.active);
    nodeSelectors.navigationDrawer.classList.remove(cssClasses.active);

    enableBodyScroll(document.body);
  }

  /**
   * Open the navigation drawer.
   */
  function openNavigationDrawer() {
    nodeSelectors.menuButton.classList.add(cssClasses.active);
    nodeSelectors.navigationDrawer.classList.add(cssClasses.active);

    disableBodyScroll(document.body);
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
