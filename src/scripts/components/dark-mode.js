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
  container: '[js-dark-mode="container"]',
  toggle: '[js-dark-mode="toggle"]',
  icon: '[js-dark-mode="icon"]',
  text: '[js-dark-mode="text"]',
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
    toggle: [...document.querySelectorAll(selectors.toggle)],
    icon: [...document.querySelectorAll(selectors.icon)],
    text: [...document.querySelectorAll(selectors.text)],
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
    nodeSelectors.toggle.forEach((element) => {
      on('click', element, () => handleModeToggle());
    });
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

    nodeSelectors.icon.forEach((element) => {
      element.classList.add(cssClasses.active);
    });

    nodeSelectors.text.forEach((element) => {
      element.innerText = 'Disable dark mode';
    });

    site.eventBus.emit('darkMode:updated', true);
  }

  /**
   * Enable light mode.
   */
  function disableDarkMode() {
    Cookies.set('darkMode', false, {expires: 30});

    nodeSelectors.container.setAttribute('data-mode', 'light');
    nodeSelectors.container.classList.remove(cssClasses.dark);

    nodeSelectors.icon.forEach((element) => {
      element.classList.remove(cssClasses.active);
    });

    nodeSelectors.text.forEach((element) => {
      element.innerText = 'Enable dark mode';
    });

    site.eventBus.emit('darkMode:updated', false);
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
