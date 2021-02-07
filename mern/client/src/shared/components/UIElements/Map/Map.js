import React, { useRef, useEffect, Fragment } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";
mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;
const Map = (props) => {
  const { center, zoom } = props;
  const containerMap = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerMap.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: zoom,
    });
    // Set options
    new mapboxgl.Marker({
      color: "#FFFFFF",
      draggable: true,
    })
      .setLngLat([center.lng, center.lat])
      .addTo(map);
    var nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-left");
    map.addControl(new mapboxgl.FullscreenControl({ container: document.querySelector("body") }));
  }, [center, zoom]);
  return (
    <Fragment>
      <div ref={containerMap} className={`map`} />
    </Fragment>
  );
};

export default Map;
