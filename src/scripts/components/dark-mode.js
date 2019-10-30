/**
 * Components > Dark mode.
 * ------------------------------------------------------------------------------
 * Dark mode detection and toggle.
 *
 * @namespace darkMode
 */
import Cookies from 'js-cookie';

import cssClasses from '../helpers/cssClasses';
import {on} from '../helpers/utils';

/**
 * DOM selectors.
 */
const selectors = {
  container: '[js-mode="container"]',
  toggle: '[js-mode="toggle"]',
  icon: '[js-mode="icon"]',
  text: '[js-mode="text"]',
};

/**
 * Create a new mode object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    container: document.querySelector(selectors.container),
    toggle: document.querySelector(selectors.toggle),
    icon: document.querySelector(selectors.icon),
    text: document.querySelector(selectors.text),
  };

  /**
   * Initialise component.
   */
  function init() {
    setEventListeners();
    checkForSetting();
  }

  /**
   * Set event listeners.
   */
  function setEventListeners() {
    on('click', nodeSelectors.toggle, () => handleModeToggle());
  }

  /**
   * Checks for cookie or OS setting.
   */
  function checkForSetting() {
    const darkModeCookie = Cookies.get('darkMode');

    if (
      darkModeCookie === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      nodeSelectors.container.classList.add(cssClasses.disableTransition);
      enableDarkMode(!window.matchMedia('(prefers-color-scheme: dark)').matches);

      window.setTimeout(() => {
        nodeSelectors.container.classList.remove(cssClasses.disableTransition);
      }, 0);
    }
  }

  /**
   * Handle mode button click event.
   */
  function handleModeToggle() {
    if (nodeSelectors.container.getAttribute('data-mode') === 'light') {
      enableDarkMode();
      return;
    }

    disableDarkMode();
  }

  /**
   * Enable dark mode.
   * @param {Boolean} cookie - Whether to set a cookie, optional.
   */
  function enableDarkMode(cookie = true) {
    if (cookie) {
      Cookies.set('darkMode', true, {expires: 30});
    }

    nodeSelectors.container.setAttribute('data-mode', 'dark');
    nodeSelectors.container.classList.add(cssClasses.dark);

    nodeSelectors.icon.classList.add(cssClasses.active);
    nodeSelectors.text.innerText = 'Disable dark mode';
  }

  /**
   * Enable light mode.
   */
  function disableDarkMode() {
    Cookies.set('darkMode', false, {expires: 30});
    nodeSelectors.container.setAttribute('data-mode', 'light');
    nodeSelectors.container.classList.remove(cssClasses.dark);

    nodeSelectors.icon.classList.remove(cssClasses.active);
    nodeSelectors.text.innerText = 'Enable dark mode';
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
