/**
 * Components > Highlighter.
 * ------------------------------------------------------------------------------
 * Adds additional code highlighting.
 *
 * @namespace highlighter
 */

/**
 * DOM selectors.
 */
const selectors = {
  code: '[data-lang]',
};

/**
 * Create a new highlighter object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    code: [...document.querySelectorAll(selectors.code)],
  };

  /**
   * Global variables.
   */
  let start = 0;

  /**
   * Initialise component.
   */
  function init() {
    start = performance.now();
    nodeSelectors.code.forEach((element) => {
      const language = element.dataset.lang;

      switch (language) {
        case 'css':
          applyCssHighlighting(element);
          break;

        case 'js':
          applyJsHighlighting(element);
          break;
      }
    });
  }

  /**
   * Applies additional CSS highlighting
   * @param {HTMLElement} element - Code container.
   */
  function applyCssHighlighting() {
    // Nothing.
  }

  /**
   * Applies additional CSS highlighting
   * @param {HTMLElement} element - Code container.
   */
  function applyJsHighlighting(element) {
    [...element.querySelectorAll('span')].forEach((code) => {
      if (code.innerText.includes('setAttribute')) {
        code.classList.add('function');
      }
    });

    const end = performance.now();

    window.console.log('time', (end - start));
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
