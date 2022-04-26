import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { setLocation } from "../../store/slices/locationSlice";
import { groundFloorRooms, firstFloorRooms } from "../../data/rooms";

import "./SVGMap.scss";

/**
 * Maps are SVG files that are used to display the locations of the rooms.
 * The SVG files are transformed using the React-Zoom-Pan-Pinch library.
 * @param {ReactComponent} props.children - The map to be displayed.
 */
function Map({ children }) {
  const activeLocation = useSelector((state) => state.location.value);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const rooms = [...groundFloorRooms, ...firstFloorRooms];

  useEffect(() => {
    const mapElements = [...mapRef.current.getElementsByClassName("room")];

    // Set the active location
    if (activeLocation) {
      mapElements.forEach((el) => {
        el.classList.remove("active");
      });
      const activeLocationElement = mapRef.current
        .querySelector("svg")
        .getElementById(activeLocation.id);
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
    <TransformWrapper>
      <TransformComponent>
        <div className="svg-map" ref={mapRef}>
          {children}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default Map;
