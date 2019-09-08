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
import {pageHandle} from './helpers/utils';

/**
 * Global component imports.
 */
import counter from './components/counter';
import header from './components/header';
import map from './components/map';

/**
 * Init based on page handle.
 */
document.addEventListener('DOMContentLoaded', () => {
  header().init();

  switch (pageHandle()) {
    case 'info':
      counter().init();
      break;

    case 'mountains':
      map().init();
      break;

    default:
      break;
  }
});
