/**
 * Components > Code.
 * ------------------------------------------------------------------------------
 * Formats Liquid code..
 *
 * @namespace code
 */

/**
 * DOM selectors.
 */
const selectors = {
  code: 'code.language-htm',
};

/**
 * Create a new code object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    code: [...document.querySelectorAll(selectors.code)],
  };

  /**
   * Initialise component.
   */
  function init() {
    if (!nodeSelectors.code.length) {
      return;
    }

    nodeSelectors.code.forEach((element) => {
      formatCode(element);
    });
  }

  /**
   * Formats Liquid code.
   * @param {HTMLElement} element - Code block.
   */
  function formatCode(element) {
    let code = String(element.innerHTML);

    element.innerHTML = code
      .replace(/(\=\s[a-z_]*\.)([a-z]*\b)(?=\s%})/g, '$1<span class="so">$2</span>')
      .replaceAll('%', '<span class="percent">%</span>')
      .replaceAll('{', '<span class="start">{</span>')
      .replaceAll('}', '<span class="end">}</span>')
      .replaceAll(' assign ', ' <span class="set">assign</span> ')
      .replaceAll(' for ', ' <span class="set">for</span> ')
      .replaceAll(' if ', ' <span class="set">if</span> ')
      .replaceAll(' elsif ', ' <span class="set">elsif</span> ')
      .replaceAll(' endif ', ' <span class="set">endif</span> ')
      .replaceAll(' endfor ', ' <span class="set">endif</span> ')
      .replaceAll('==', '<span class="p">==</span>')
      .replaceAll(' = ', ' <span class="p">=</span> ')
      .replaceAll('.', '<span class="p">.</span>')
      .replaceAll(' | ', ' <span class="p">|</span> ')
      .replaceAll(', ', '<span class="p">,</span> ')
      .replaceAll(' in ', ' <span class="p">in</span> ')
      .replaceAll(' product', ' <span class="fo">product</span>')
      .replace(/(\'[a-z_]*\')/g, '<span class="string">$1</span>');
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
