/**
 * Index JS.
 * ------------------------------------------------------------------------------
 * Entry point JavaScript file.
 *
 */

/**
 * Stylesheet.
 */
import "../styles/theme.scss";


/**
 * Global modules.
 */
import {on} from './helpers/utils';

console.log('Test');

const menu = document.querySelector('[js-header="menu"]');

on('click', menu, () => {
  if (menu.classList.contains('is-active')) {
    menu.classList.remove('is-active');
    return;
  }

  menu.classList.add('is-active');
});
