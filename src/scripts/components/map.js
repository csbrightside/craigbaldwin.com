/**
 * Components > Map.
 * ------------------------------------------------------------------------------
 * Map and progress bar functionality.
 *
 * @namespace map
 */
import Leaflet from 'leaflet';
import {CountUp} from 'countup.js';

import {mapData} from '../helpers/map-data';
import cssClasses from '../helpers/cssClasses';

/**
 * DOM selectors.
 */
const selectors = {
  progressBar: '[js-map="progressBar"]',
  count: '[js-map="count"]',
  total: '[js-map="total"]',
};

/**
 * Create a new header object.
 */
export default () => {

  /**
   * Global variables.
   */
  let map = {};

  /**
   * DOM node selectors.
   */
  const nodeSelectors = {
    progressBar: document.querySelector(selectors.progressBar),
    count: document.querySelector(selectors.count),
    total: document.querySelector(selectors.total),
  };

  /**
   * Initialise component.
   */
  function init() {
    buildMap();
    updateProgress();
  }

  /**
   * Build the map display.
   */
  function buildMap() {
    map = Leaflet.map('map', {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([54.518, -3.05], 10);

    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaW50ZXJtZWRpYXNvbHV0aW9ucyIsImEiOiJjaWtudXJvY2swMDhnd2ptNHB6NXBjMW4yIn0.BZeUbqCxxu6YbiIzpRU8QQ', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.outdoors',
      maxZoom: 13,
      accessToken: 'pk.eyJ1IjoiaW50ZXJtZWRpYXNvbHV0aW9ucyIsImEiOiJjaWtudXJvY2swMDhnd2ptNHB6NXBjMW4yIn0.BZeUbqCxxu6YbiIzpRU8QQ',
    }).addTo(map);

    Leaflet.control.zoom({position: 'topright'}).addTo(map);

    addMarkers();
  }

  /**
   * Add markers to the map.
   */
  function addMarkers() {
    const data = mapData();

    data.forEach((location) => {
      const icon = Leaflet.icon({
        iconUrl: `/images/marker-${location.region}.svg`,
        iconSize: [34, 28],
        iconAnchor: [17, 25],
      });

      Leaflet.marker(location.latLng, {
        title: location.name,
        riseOnHover: true,
        icon,
      }).bindPopup(location.name, {closeButton: false}).addTo(map);
    });
  }

  /**
   * Update the progress bar and count.
   */
  function updateProgress() {
    const mountains = nodeSelectors.count.getAttribute('data-value');
    const total = nodeSelectors.total.getAttribute('data-value');

    const countUp = new CountUp(nodeSelectors.count, mountains, {
      duration: 1.2,
      useEasing: false,
    });

    if (!countUp.error) {
      nodeSelectors.count.classList.add(cssClasses.active);
      countUp.start();
    }

    const completion = `${((mountains / total) * 100)}%`;

    nodeSelectors.progressBar.style.width = completion;
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
