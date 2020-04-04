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
import eventBus from './helpers/event-bus';
import {pageHandle} from './helpers/utils';

/**
 * Global component imports.
 */
import accordion from './components/accordion';
import charts from './components/charts';
import counter from './components/counter';
import header from './components/header';
import map from './components/map';
import darkMode from './components/dark-mode';
import progress from './components/progress';

/**
 * Global utils.
 */
window.site = window.site || {};
window.site.eventBus = eventBus();

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
      accordion('#SummariesAccordion').init();
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
