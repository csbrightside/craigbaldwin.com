/**
 * Index JS.
 * ------------------------------------------------------------------------------
 * Entry point JavaScript file.
 *
 */
import "../styles/theme.scss";

/**
 * Global helper imports.
 */
import {keyboardTabbable} from './helpers/a11y';
import {pageHandle} from './helpers/utils';

/**
 * Global component imports.
 */
import charts from './components/charts';
import counter from './components/counter';
import header from './components/header';
import map from './components/map';
import darkMode from './components/dark-mode';
import progress from './components/progress';

/**
 * Init based on page handle.
 */
document.addEventListener('DOMContentLoaded', () => {
  keyboardTabbable().init();
  header().init();
  darkMode().init();

  switch (pageHandle()) {
    case 'info':
      counter().init();
      break;

    case 'distances':
      charts().init();
      break;

    case 'mountains':
      map().init();
      progress().init();
      break;

    default:
      break;
  }
});
