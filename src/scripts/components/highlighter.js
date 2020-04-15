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
   * Specific terms.
   */
  const jsTerms = {
    operators: [
      '=>',
    ],
    functions: [
      'add',
      'addEventListener',
      'dataset',
      'forEach',
      'remove',
      'removeAttribute',
      'setAttribute',
      'querySelector',
    ],
  };

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
      if (jsTerms.functions.includes(code.innerText)) {
        code.classList.add('function');
        return;
      }

      if (jsTerms.operators.includes(code.innerText)) {
        code.classList.add('operator');
      }
    });

    window.console.log('Performance:', (performance.now() - start));
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
