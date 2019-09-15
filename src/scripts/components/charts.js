/**
 * Components > Charts.
 * ------------------------------------------------------------------------------
 * Distance charts functionality.
 *
 * @namespace charts
 */
import Chart from 'chart.js';

/**
 * DOM selectors.
 */
const selectors = {
  walkingChart: '[js-chart="walking"]',
  totalChart: '[js-chart="total"]',
};

/**
 * Chart.js global configuration.
 */
Chart.defaults.global.defaultFontColor = '#1c1c1c';
Chart.defaults.global.defaultFontFamily = " SpaceGrotesk, Arial, sans-serif";
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.tooltips.backgroundColor = '#1c1c1c';
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
   * Initialise component.
   */
  function init() {
    buildWalkingChart();
    buildTotalChart();
  }

  /**
   * Build walking chart using Chart.js
   */
  function buildWalkingChart() {
    new Chart(nodeSelectors.walkingChart, {
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
    });
  }

  /**
   * Build total distances chart using Chart.js
   */
  function buildTotalChart() {
    new Chart(nodeSelectors.totalChart, {
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
    });
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
