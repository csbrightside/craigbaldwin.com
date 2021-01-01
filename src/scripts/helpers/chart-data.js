/**
 * Helper: Chart data
 * ------------------------------------------------------------------------------
 * Datasets and settings for each chart.
 *
 * @namespace chartData
 */

/**
 * Elevation data.
 * - Fitbit floors (* 3) + running elevation.
 */
export const elevationData = {
  type: 'bar',
  data: {
    labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Elevation',
        data: [
          0,
          0,
          0,
          25530,
          30192,
          37965,
          39348,
          41918,
          38715,
          42272,
          40036,
          49942,
        ],
        backgroundColor: 'rgba(59, 80, 245, 0.6)',
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
        },
      ],
    },
  },
};

/**
 * Total chart data.
 */
export const totalData = {
  type: 'bar',
  data: {
    labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Walk',
        data: [438.7, 858.9, 941.6, 1161.9, 1422.7, 1708.3, 1819.7, 1780.8, 1787.6, 1934.7, 1894.5, 1651.3],
        backgroundColor: 'rgba(19, 169, 160, 0.7)',
        borderWidth: 0,
      },
      {
        label: 'Run',
        data: [0, 96.4, 548.4, 1104.9, 1148.2, 853.1, 710.2, 732.6, 701.2, 452.3, 261.1, 383.2],
        backgroundColor: 'rgba(40, 88, 130, 0.7)',
        borderWidth: 0,
      },
      {
        label: 'Bike',
        data: [0, 7.4, 12.4, 40.2, 116, 54, 0, 0, 0],
        backgroundColor: 'rgba(78, 205, 196, 0.7)',
        borderWidth: 0,
      },
      {
        label: 'Bus',
        data: [72.6, 74.4, 1449.4, 1645.1, 1500.1, 570, 37.4, 18.6, 13.5, 1.9, 43],
        backgroundColor: 'rgba(132, 1, 85, 0.6)',
        borderWidth: 0,
      },
      {
        label: 'Train',
        data: [1758.6, 1220, 5289.6, 1462.6, 1069.4, 2806.4, 3392.5, 1068.2, 1218.5, 5578, 4986.2, 1177.1],
        backgroundColor: 'rgba(255, 107, 107, 0.9)',
        borderWidth: 0,
      },
      {
        label: 'Car',
        data: [3226, 4181.3, 7937, 5228.8, 6021.6, 3633.9, 2977.3, 5903.8, 8103.9, 4324.3, 5910.9, 4345.4],
        backgroundColor: 'rgba(196, 77, 88, 0.9)',
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

/**
 * Walking chart data.
 */
export const walkingData = {
  type: 'bar',
  data: {
    labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Run',
        data: [0, 96.4, 548.4, 1104.9, 1148.2, 853.1, 710.2, 732.6, 701.2, 452.3, 261.1, 383.2],
        backgroundColor: 'rgba(40, 88, 130, 0.7)',
        borderWidth: 0,
        yAxisID: 'A',
      },
      {
        label: 'Walk',
        data: [438.7, 858.9, 941.6, 1161.9, 1422.7, 1708.3, 1819.7, 1780.8, 1787.6, 1934.7, 1894.5, 1651.3],
        backgroundColor: 'rgba(19, 169, 160, 0.7)',
        borderWidth: 0,
        yAxisID: 'A',
      },
      {
        label: 'Average Miles By Foot Per Day',
        data: [1.2, 2.62, 4.08, 6.19, 7.03, 7, 6.91, 6.85, 6.8, 6.45, 5.89, 5.54],
        type: 'line',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(52, 152, 219, 1)',
        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
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
