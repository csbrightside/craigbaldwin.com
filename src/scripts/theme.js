/**
 * Index JS.
 * ------------------------------------------------------------------------------
 * Entry point JavaScript file.
 *
 */
import "../styles/theme.scss";

/**
 * Global component imports.
 */
import header from './components/header';

document.addEventListener('DOMContentLoaded', () => {
  header().init();
});
