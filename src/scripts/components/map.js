/**
 * Components > Map.
 * ------------------------------------------------------------------------------
 * Mountains map functionality.
 *
 * @namespace map
 */
import {mapData} from '../helpers/map-data';

/**
 * Create a new header object.
 */
export default () => {

  /**
   * Global variables.
   */
  let map = {};

  /**
   * Initialise component.
   */
  function init() {
    buildMap();
  }

  /**
   * Build the map display.
   */
  function buildMap() {
    map = L.map('map', {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([54.518, -3.05], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      accessToken: 'pk.eyJ1IjoiY3JhaWdiYWxkd2luIiwiYSI6ImNrMmhyZXV4bjA4ajMzbW52ejF5c2ppd3oifQ.l_5II-ZwhXVtIcCsgNIwqw',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 13,
    }).addTo(map);

    L.control.zoom({position: 'topright'}).addTo(map);

    // map.on('contextmenu', (event) => {
    //   window.alert(event.latlng);
    // });

    addMarkers();
  }

  /**
   * Add markers to the map.
   */
  function addMarkers() {
    const data = mapData();

    data.forEach((location) => {
      const icon = L.icon({
        iconUrl: '/images/icons/map-marker.svg',
        iconSize: [34, 28],
        iconAnchor: [17, 25],
      });

      L.marker(location.latLng, {
        title: location.name,
        riseOnHover: true,
        icon,
      }).bindPopup(location.name, {closeButton: false}).addTo(map);
    });
  }

  /**
   * Expose public interface.
   */
  return Object.freeze({
    init,
  });
};
