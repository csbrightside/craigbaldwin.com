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

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaW50ZXJtZWRpYXNvbHV0aW9ucyIsImEiOiJjaWtudXJvY2swMDhnd2ptNHB6NXBjMW4yIn0.BZeUbqCxxu6YbiIzpRU8QQ', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.outdoors',
      maxZoom: 13,
      accessToken: 'pk.eyJ1IjoiaW50ZXJtZWRpYXNvbHV0aW9ucyIsImEiOiJjaWtudXJvY2swMDhnd2ptNHB6NXBjMW4yIn0.BZeUbqCxxu6YbiIzpRU8QQ',
    }).addTo(map);

    L.control.zoom({position: 'topright'}).addTo(map);

    addMarkers();
  }

  /**
   * Add markers to the map.
   */
  function addMarkers() {
    const data = mapData();

    data.forEach((location) => {
      const icon = L.icon({
        iconUrl: `${window.baseUrl}/images/marker-${location.region}.svg`,
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
