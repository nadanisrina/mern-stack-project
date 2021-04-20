// import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
const API_TOKEN = "pk.eyJ1IjoibmFkYW5pc3JpbmFzIiwiYSI6ImNra3A4NGFzZjAyOHkybm11anNtdDFvNWQifQ.KmLI-qDeCyIjUtTUB4j4iQ";
async function getGeoCoordinate(address) {
  let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${API_TOKEN}`);
  let lat = response.data.features[0].geometry.coordinates[0];
  let lng = response.data.features[0].geometry.coordinates[1];
  let coordinates = { lat: lat, lng: lng };
  return coordinates;
}

export default getGeoCoordinate;
