/**
 * Helpers: a11y
 * ------------------------------------------------------------------------------
 * Entry file for accessibility utility functions.
 *
 * @namespace a11y
 */
import cssClasses from './cssClasses';

/**
 * Enables focus.tabbable class to body
 * - Used to control styling of accessibility focus states.
 */
export function keyboardTabbable() {

  /**
   * Instantiate state and events.
   */
  function init() {
    setKeyboardEventListeners();
  }

  /**
   * Set keyboard listeners.
   */
  function setKeyboardEventListeners() {
    document.addEventListener('keydown', handleKeyboardEvent);
  }

  /**
   * Handle keyboard events after validating Tab.
   * @param {Event} event Keyboard keydown event.
   */
  function handleKeyboardEvent(event) {
    if (isKeyPressIsTab(event)) {
      handleTabEvent();
    }
  }

  /**
   * Check if Tab key has been pressed.
   * @param {Event} event - Keyboard event passed from user input on document.
   */
  function isKeyPressIsTab(event) {
    return event.keyCode === 9;
  }

  /**
   * Handle Tab keyboard event.
   * @param {Event} event - Key code event set on document.
   */
  function handleTabEvent() {
    document.body.classList.add(cssClasses.tabbable);
    document.removeEventListener('keydown', handleKeyboardEvent);
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
}
