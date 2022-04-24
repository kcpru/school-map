import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as SVGMap } from "../../assets/maps/groundFloor.svg";
import { setLocation } from "../../store/slices/locationSlice";
import rooms from "../../data/rooms.json";

import "./SVGMap.scss";

function Map() {
  const activeLocation = useSelector((state) => state.location.value);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  useEffect(() => {
    const mapElements = [...mapRef.current.getElementsByClassName("rooms")];

    // Set the active location
    if (activeLocation) {
      mapElements.forEach((el) => {
        el.classList.remove("active");
      });
      const activeLocationElement = mapRef.current.getElementById(
        activeLocation.id
      );
      activeLocationElement && activeLocationElement.classList.add("active");
    }

    mapElements.forEach((element) => {
      if (rooms.find((room) => room.id === element.id)) {
        // Show rooms which are defined in the data
        element.classList.add("clickable");

        element.addEventListener("click", () => {
          // Add active class to clicked element
          element.classList.add("active");
          // Find data for the clicked element
          const clickedLocation =
            rooms.find((el) => el.id === element.id) ?? {};
          dispatch(setLocation(clickedLocation));
        });
      }
    });

    return () => {
      mapElements.forEach((element) =>
        element.removeEventListener("click", () => {})
      );
    };
  });

  return (
    <div className="svg-map">
      <SVGMap ref={mapRef} />
    </div>
  );
}

export default Map;
