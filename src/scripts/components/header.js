/**
 * Components > Header.
 * ------------------------------------------------------------------------------
 * Header menu functionality.
 *
 * @namespace header
 */
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

import breakpoints from '../helpers/breakpoints';
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
    if (!window.matchMedia(`(min-width: ${breakpoints.medium})`).matches) {
      setInitState();
    }

    setEventListeners();
  }

  /**
   * Sets initial state based on screen size.
   */
  function setInitState() {
    if (window.matchMedia(`(min-width: ${breakpoints.medium})`).matches) {
      setTabindex(0);
      clearAriaProperties(true);
      return;
    }

    setTabindex(-1);
    setAriaProperties(false);
  }

  /**
   * Reset tabindex of header links.
   * @param {Number} tabindex - Value to set.
   */
  function setTabindex(tabindex) {
    nodeSelectors.navigationLink.forEach((element) => element.setAttribute('tabindex', tabindex));
    nodeSelectors.navigationDrawer.querySelector(selectors.darkMode).setAttribute('tabindex', tabindex);
  }

  /**
   * Sets aria-expanded and -hidden properties.
   * @param {Boolean} expanded - If expanded is true then hidden is false.
   */
  function setAriaProperties(expanded) {
    nodeSelectors.menuButton.setAttribute('aria-expanded', expanded);
    nodeSelectors.navigationDrawer.setAttribute('aria-hidden', !expanded);
  }

  /**
   * Clears aria properties.
   */
  function clearAriaProperties() {
    nodeSelectors.menuButton.removeAttribute('aria-expanded');
    nodeSelectors.navigationDrawer.removeAttribute('aria-hidden');
  }

  /**
   * Set event listeners.
   */
  function setEventListeners() {
    on('click', nodeSelectors.menuButton, () => handleMenuToggle());
    on('blur', nodeSelectors.navigationDrawer, () => closeNavigationDrawer());
    on('resize', () => debounce(handleResize()));
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
    nodeSelectors.navigationDrawer.classList.add(cssClasses.active);

    disableBodyScroll(document.body);
    setTabindex(0);
    setAriaProperties(true);

    document.addEventListener('keydown', trapFocus);
  }

  /**
   * Close the navigation drawer.
   */
  function closeNavigationDrawer() {
    nodeSelectors.menuButton.classList.remove(cssClasses.active);
    nodeSelectors.navigationDrawer.classList.remove(cssClasses.active);

    enableBodyScroll(document.body);
    setTabindex(-1);
    setAriaProperties(false);

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
  function handleResize() {
    setInitState();

    const newWidth = window.innerWidth;

    if (
      !window.matchMedia(`(min-width: ${breakpoints.medium})`).matches &&
      newWidth !== initWidth
    ) {
      closeNavigationDrawer();
    }

    initWidth = window.innerWidth;
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
