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
  navigationLink: '[js-header="navigationLink"]',
  darkMode: '[js-dark-mode="toggle"]',
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
    navigationLink: [...document.querySelectorAll(selectors.navigationLink)],
  };

  /**
   * Global variables.
   */
  let initWidth = window.innerWidth;
  const focusableElements = nodeSelectors.navigationDrawer.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  /**
   * Initialise component.
   */
  function init() {
    closeNavigationDrawer();
    setEventListeners();
  }

  /**
   * Set event listeners.
   */
  function setEventListeners() {
    on('click', nodeSelectors.menuButton, () => handleMenuToggle());
    on('blur', nodeSelectors.navigationDrawer, () => closeNavigationDrawer());
    on('resize', () => debounce(checkResizeWidth()));
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
   * Open the navigation drawer.
   */
  function openNavigationDrawer() {
    nodeSelectors.menuButton.classList.add(cssClasses.active);
    nodeSelectors.menuButton.setAttribute('aria-expanded', true);

    nodeSelectors.navigationDrawer.classList.add(cssClasses.active);
    nodeSelectors.navigationDrawer.setAttribute('aria-hidden', false);

    nodeSelectors.navigationLink.forEach((element) => element.setAttribute('tabindex', 0));
    nodeSelectors.navigationDrawer.querySelector(selectors.darkMode).setAttribute('tabindex', 0);

    disableBodyScroll(document.body);
    document.addEventListener('keydown', trapFocus);
  }

  /**
   * Close the navigation drawer.
   */
  function closeNavigationDrawer() {
    nodeSelectors.menuButton.classList.remove(cssClasses.active);
    nodeSelectors.menuButton.setAttribute('aria-expanded', false);

    nodeSelectors.navigationDrawer.classList.remove(cssClasses.active);
    nodeSelectors.navigationDrawer.setAttribute('aria-hidden', true);

    nodeSelectors.navigationLink.forEach((element) => element.setAttribute('tabindex', -1));
    nodeSelectors.navigationDrawer.querySelector(selectors.darkMode).setAttribute('tabindex', -1);

    enableBodyScroll(document.body);
    document.removeEventListener('keydown', trapFocus);
  }

  /**
   * Handles the keydown even and traps focus.
   * @param {Object} event - Keydown event.
   */
  function trapFocus(event) {
    handleEsc(event);

    const isTabPressed = (event.key === 'Tab') || (event.keyCode === 9);

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        nodeSelectors.menuButton.focus();

      } else if (document.activeElement === nodeSelectors.menuButton) {
        event.preventDefault();
        lastElement.focus();
      }

    } else if (document.activeElement === lastElement) {
      event.preventDefault();
      nodeSelectors.menuButton.focus();

    } else if (document.activeElement === nodeSelectors.menuButton) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Handles keydown event to close drawer on esc press.
   * @param {Object} event - Keydown event.
   */
  function handleEsc(event) {
    if (event.key !== 'Escape' || event.keyCode !== 27) {
      return;
    }

    closeNavigationDrawer();
  }

  /**
   * Checks to see if window width has changed.
   * - Triggers navigation drawer close if it has.
   */
  function checkResizeWidth() {
    const newWidth = window.innerWidth;

    if (newWidth !== initWidth) {
      closeNavigationDrawer();
      initWidth = window.innerWidth;
    }
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
