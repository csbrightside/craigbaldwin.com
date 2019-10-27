/**
 * Components > Dark mode.
 * ------------------------------------------------------------------------------
 * Dark mode detection and toggle.
 *
 * @namespace darkMode
 */
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
  }

  /**
   * Set event listeners.
   */
  function setEventListeners() {
    on('click', nodeSelectors.toggle, () => handleModeToggle());
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
   */
  function enableDarkMode() {
    nodeSelectors.container.setAttribute('data-mode', 'dark');
    nodeSelectors.container.classList.add(cssClasses.dark);

    nodeSelectors.icon.innerHTML = theme.icons.darkMode;
    nodeSelectors.text.innerText = 'Disable dark mode';
  }

  /**
   * Enable light mode.
   */
  function disableDarkMode() {
    nodeSelectors.container.setAttribute('data-mode', 'light');
    nodeSelectors.container.classList.remove(cssClasses.dark);

    nodeSelectors.icon.innerHTML = theme.icons.lightMode;
    nodeSelectors.text.innerText = 'Enable dark mode';
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
