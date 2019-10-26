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
import charts from './components/charts';
import map from './components/map';
import progress from './components/progress';

/**
* Site base URL used for relative paths.
*/
window.baseUrl = '/';

/**
 * Init based on page handle.
 */
document.addEventListener('DOMContentLoaded', () => {
  header().init();

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
