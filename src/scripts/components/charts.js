/**
 * Components > Charts.
 * ------------------------------------------------------------------------------
 * Distance charts functionality.
 *
 * @namespace charts
 */
import Cookies from 'js-cookie';

import {elevationData, totalData, walkingData} from '../helpers/chart-data';

 /**
 * DOM selectors.
 */
const selectors = {
  walking: '[js-chart="walking"]',
  total: '[js-chart="total"]',
  elevation: '[js-chart="elevation"]',
};

/**
 * Create a new header object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    walking: document.querySelector(selectors.walking).getContext('2d'),
    total: document.querySelector(selectors.total).getContext('2d'),
    elevation: document.querySelector(selectors.elevation).getContext('2d'),
  };

  /**
   * Chart.js global configuration.
   */
  const darkModeColours = {
    fontColour: 'rgba(242, 242, 242, 1)',
    gridLinesColour: 'rgba(242, 242, 242, 0.1)',
    zeroLineColour: 'rgba(242, 242, 242, 0.25)',
  };

  const lightModeColours = {
    fontColour: 'rgba(27, 34, 41, 1)',
    gridLinesColour: 'rgba(27, 34, 41, 0.1)',
    zeroLineColour: 'rgba(27, 34, 41, 0.25)',
  };

  Chart.defaults.global.defaultFontColor = lightModeColours.fontColour;
  Chart.defaults.global.defaultFontFamily = "Eczar, serif";
  Chart.defaults.global.defaultFontSize = 12;
  Chart.defaults.global.tooltips.backgroundColor = lightModeColours.fontColour;
  Chart.defaults.global.tooltips.borderWidth = 0;
  Chart.defaults.global.tooltips.caretPadding = 5;
  Chart.defaults.global.tooltips.caretSize = 10;
  Chart.defaults.global.tooltips.cornerRadius = 0;
  Chart.defaults.global.tooltips.displayColors = false;
  Chart.defaults.global.tooltips.position = 'nearest';
  Chart.defaults.global.tooltips.titleFontStyle = 700;
  Chart.defaults.global.tooltips.titleMarginBottom = 6;
  Chart.defaults.global.tooltips.xPadding = 10;
  Chart.defaults.global.tooltips.yPadding = 10;

  /**
   * Global variables.
   */
  const charts = {
    elevation: {
      id: 'elevation',
      selector: nodeSelectors.elevation,
      data: elevationData,
    },
    total: {
      id: 'total',
      selector: nodeSelectors.total,
      data: totalData,
    },
    walking: {
      id: 'walking',
      selector: nodeSelectors.walking,
      data: walkingData,
    },
  };

  const render = {};

  /**
   * Initialise component.
   */
  function init() {
    buildCharts();

    if (isDarkMode()) {
      setDarkModeColours();
    }

    /**
     * Avoids the first emit when page loads.
     */
    window.setTimeout(() => {
      setEventBusListeners();
    }, 0);
  }

  /**
   * Build all charts.
   */
  function buildCharts() {
    Object.keys(charts).forEach((key) => {
      const chart = charts[key];
      render[chart.id] = new Chart(chart.selector, chart.data);
    });
  }

  /**
   * Is dark mode active.
   * @returns {Boolean}
   */
  function isDarkMode() {
    const darkModeCookie = Cookies.get('darkMode');

    return (
      darkModeCookie === 'true' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  /**
   * Set eventBus listeners.
   */
  function setEventBusListeners() {
    site.eventBus.listen('darkMode:updated', (darkMode) => handleDarkModeEvent(darkMode));
  }

  /**
   * Handle dark mode updated event.
   * @param {Boolean} darkMode - Whether dark mode is active.
   */
  function handleDarkModeEvent(darkMode) {
    if (darkMode) {
      setDarkModeColours();
      return;
    }

    setLightModeColours();
  }

  /**
   * Enable chart dark mode.
   */
  function setDarkModeColours() {
    Object.keys(charts).forEach((key) => {
      const chart = charts[key].data.options.scales;

      chart.xAxes[0].ticks.fontColor = darkModeColours.fontColour;
      chart.yAxes[0].ticks.fontColor = darkModeColours.fontColour;
      chart.yAxes[0].gridLines.color = darkModeColours.gridLinesColour;
      chart.yAxes[0].gridLines.zeroLineColor = darkModeColours.zeroLineColour;

      if (chart.yAxes.length > 1) {
        chart.yAxes[1].ticks.fontColor = darkModeColours.fontColour;
        chart.yAxes[1].gridLines.color = darkModeColours.gridLinesColour;
        chart.yAxes[1].gridLines.zeroLineColor = darkModeColours.zeroLineColour;
      }
    });

    resetCharts();
  }

  /**
   * Enable chart light mode.
   */
  function setLightModeColours() {
    Object.keys(charts).forEach((key) => {
      const chart = charts[key].data.options.scales;

      chart.xAxes[0].ticks.fontColor = darkModeColours.fontColour;
      chart.yAxes[0].ticks.fontColor = darkModeColours.fontColour;
      chart.yAxes[0].gridLines.color = darkModeColours.gridLinesColour;
      chart.yAxes[0].gridLines.zeroLineColor = darkModeColours.zeroLineColour;

      if (chart.yAxes.length > 1) {
        chart.yAxes[1].ticks.fontColor = darkModeColours.fontColour;
        chart.yAxes[1].gridLines.color = darkModeColours.gridLinesColour;
        chart.yAxes[1].gridLines.zeroLineColor = darkModeColours.zeroLineColour;
      }
    });

    resetCharts();
  }

  /**
   * Resets the charts.
   */
  function resetCharts() {
    Object.keys(render).forEach((key) => {
      const chart = render[key];
      chart.destroy();
    });

    buildCharts();
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
