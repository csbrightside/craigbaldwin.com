/**
 * Components > Charts.
 * ------------------------------------------------------------------------------
 * Distance charts functionality.
 *
 * @namespace charts
 */
import Cookies from 'js-cookie';

 /**
 * DOM selectors.
 */
const selectors = {
  walkingChart: '[js-chart="walking"]',
  totalChart: '[js-chart="total"]',
};

/**
 * Create a new header object.
 */
export default () => {

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    walkingChart: document.querySelector(selectors.walkingChart).getContext('2d'),
    totalChart: document.querySelector(selectors.totalChart).getContext('2d'),
  };

  /**
   * Chart.js global configuration.
   */
  Chart.defaults.global.defaultFontColor = 'rgba(27, 34, 41, 1)';
  Chart.defaults.global.defaultFontFamily = "SpaceGrotesk, Arial, sans-serif";
  Chart.defaults.global.defaultFontSize = 12;
  Chart.defaults.global.tooltips.backgroundColor = 'rgba(27, 34, 41, 1)';
  Chart.defaults.global.tooltips.position = 'nearest';
  Chart.defaults.global.tooltips.titleFontStyle = 700;
  Chart.defaults.global.tooltips.titleMarginBottom = 6;
  Chart.defaults.global.tooltips.xPadding = 10;
  Chart.defaults.global.tooltips.yPadding = 10;
  Chart.defaults.global.tooltips.cornerRadius = 0;
  Chart.defaults.global.tooltips.borderWidth = 0;
  Chart.defaults.global.tooltips.caretSize = 10;
  Chart.defaults.global.tooltips.caretPadding = 5;
  Chart.defaults.global.tooltips.displayColors = false;

  /**
   * Global variables.
   */
  let walkingChart = {};
  let walkingChartSettings = {};
  let totalChart = {};
  let totalChartSettings = {};

  /**
   * Initialise component.
   */
  function init() {
    buildWalkingChart();
    buildTotalChart();

    if (isDarkMode()) {
      setDarkModeSettings();

      walkingChart.update();
      totalChart.update();
    }

    /**
     * Avoids the first emit when page loads.
     */
    window.setTimeout(() => {
      setEventBusListeners();
    }, 0);
  }

  /**
   * Build walking chart using Chart.js
   */
  function buildWalkingChart() {
    walkingChartSettings = {
      type: 'bar',
      data: {
        labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        datasets: [
          {
            label: 'Run',
            data: [0, 96.4, 548.4, 1104.9, 1148.2, 853.1, 710.2, 732.6, 701.2, 452.3],
            backgroundColor: 'rgba(85,98,112,0.5)',
            borderWidth: 0,
            yAxisID: 'A',
          },
          {
            label: 'Walk',
            data: [438.7, 858.9, 941.6, 1161.9, 1422.7, 1708.3, 1819.7, 1780.8, 1787.6, 1934.7],
            backgroundColor: 'rgba(101,145,218,0.5)',
            borderWidth: 0,
            yAxisID: 'A',
          },
          {
            label: 'Average Miles By Foot Per Day',
            data: [1.2, 2.62, 4.08, 6.19, 7.03, 7, 6.91, 6.85, 6.8, 6.45],
            type: 'line',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#3498db',
            pointBackgroundColor: '#3498db',
            yAxisID: 'B',
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              stacked: true,
            },
          ],
          yAxes: [
            {
              id: 'A',
              position: 'left',
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
            {
              id: 'B',
              position: 'right',
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };

    walkingChart = new Chart(nodeSelectors.walkingChart, walkingChartSettings);
  }

  /**
   * Build total distances chart using Chart.js
   */
  function buildTotalChart() {
    totalChartSettings = {
      type: 'bar',
      data: {
        labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        datasets: [
          {
            label: 'Walk',
            data: [438.7, 858.9, 941.6, 1161.9, 1422.7, 1708.3, 1819.7, 1780.8, 1787.6, 1934.7],
            backgroundColor: 'rgba(101,145,218,1.0)',
            borderWidth: 0,
          },
          {
            label: 'Run',
            data: [0, 96.4, 548.4, 1104.9, 1148.2, 853.1, 710.2, 732.6, 701.2, 452.3],
            backgroundColor: 'rgba(85,98,112,1.0)',
            borderWidth: 0,
          },
          {
            label: 'Bike',
            data: [0, 7.4, 12.4, 40.2, 116, 54, 0],
            backgroundColor: 'rgba(78,205,196,1.0)',
            borderWidth: 0,
          },
          {
            label: 'Bus',
            data: [72.6, 74.4, 1449.4, 1645.1, 1500.1, 570, 37.4, 18.6, 13.5],
            backgroundColor: 'rgba(199,244,100,1.0)',
            borderWidth: 0,
          },
          {
            label: 'Train',
            data: [1758.6, 1220, 5289.6, 1462.6, 1069.4, 2806.4, 3392.5, 1068.2, 1218.5, 5578],
            backgroundColor: 'rgba(255,107,107,1.0)',
            borderWidth: 0,
          },
          {
            label: 'Car',
            data: [3226, 4181.3, 7937, 5228.8, 6021.6, 3633.9, 2977.3, 5903.8, 8103.9, 4324.3],
            backgroundColor: 'rgba(196,77,88,1.0)',
            borderWidth: 0,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    };

    totalChart = new Chart(nodeSelectors.totalChart, totalChartSettings);
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
    walkingChart.destroy();
    totalChart.destroy();

    if (darkMode) {
      setDarkModeSettings();
    } else {
      setLightModeSettings();
    }

    walkingChart = new Chart(nodeSelectors.walkingChart, walkingChartSettings);
    totalChart = new Chart(nodeSelectors.totalChart, totalChartSettings);
  }

  /**
   * Enable chart dark mode.
   */
  function setDarkModeSettings() {
    walkingChartSettings.options.scales.xAxes[0].ticks.fontColor = 'rgba(242,242,242,1)';
    walkingChartSettings.options.scales.yAxes[0].ticks.fontColor = 'rgba(242,242,242,1)';
    walkingChartSettings.options.scales.yAxes[0].gridLines.color = 'rgba(242,242,242,0.1)';
    walkingChartSettings.options.scales.yAxes[0].gridLines.zeroLineColor = 'rgba(242,242,242,0.25)';
    walkingChartSettings.options.scales.yAxes[1].ticks.fontColor = 'rgba(242,242,242,1)';
    walkingChartSettings.options.scales.yAxes[1].gridLines.color = 'rgba(242,242,242,0.1)';
    walkingChartSettings.options.scales.yAxes[1].gridLines.zeroLineColor = 'rgba(242,242,242,0.25)';

    totalChartSettings.options.scales.xAxes[0].ticks.fontColor = 'rgba(242,242,242,1)';
    totalChartSettings.options.scales.yAxes[0].ticks.fontColor = 'rgba(242,242,242,1)';
    totalChartSettings.options.scales.yAxes[0].gridLines.color = 'rgba(242,242,242,0.1)';
    totalChartSettings.options.scales.yAxes[0].gridLines.zeroLineColor = 'rgba(242,242,242,0.25)';
  }

  /**
   * Enable chart light mode.
   */
  function setLightModeSettings() {
    walkingChartSettings.options.scales.xAxes[0].ticks.fontColor = 'rgba(27,34,41,1)';
    walkingChartSettings.options.scales.yAxes[0].ticks.fontColor = 'rgba(27,34,41,1)';
    walkingChartSettings.options.scales.yAxes[0].gridLines.color = 'rgba(27,34,41,0.1)';
    walkingChartSettings.options.scales.yAxes[0].gridLines.zeroLineColor = 'rgba(27,34,41,0.25)';
    walkingChartSettings.options.scales.yAxes[1].ticks.fontColor = 'rgba(27,34,41,1)';
    walkingChartSettings.options.scales.yAxes[1].gridLines.color = 'rgba(27,34,41,0.1)';
    walkingChartSettings.options.scales.yAxes[1].gridLines.zeroLineColor = 'rgba(27,34,41,0.25)';

    totalChartSettings.options.scales.xAxes[0].ticks.fontColor = 'rgba(27,34,41,1)';
    totalChartSettings.options.scales.yAxes[0].ticks.fontColor = 'rgba(27,34,41,1)';
    totalChartSettings.options.scales.yAxes[0].gridLines.color = 'rgba(27,34,41,0.1)';
    totalChartSettings.options.scales.yAxes[0].gridLines.zeroLineColor = 'rgba(27,34,41,0.25)';
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
