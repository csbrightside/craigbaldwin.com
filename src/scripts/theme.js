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
import {pageType} from './helpers/utils';

/**
 * Global component imports.
 */
import header from './components/header';

/**
 * Global template imports.
 */
import infoPage from './layouts/info';

document.addEventListener('DOMContentLoaded', () => {
  header().init();

  switch (pageType()) {
    case 'info':
      infoPage().init();
      break;
  }
});
