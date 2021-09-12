import React from "react";
import PropTypes from "prop-types";

function SVGMap({
  className = "svg-map",
  map,
  role = "none",
  childrenBefore,
  childrenAfter,
  onLocationClick,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={map.viewBox}
      className={className}
      role={role}
      aria-label={map.label}
    >
      {childrenBefore}
      {map.locations.map((location) => (
        <path
          id={location.id}
          name={location.name}
          d={location.path}
          className={location.ClassName}
          aria-label={location.label}
          onClick={onLocationClick}
          key={location.id}
        />
      ))}
      {childrenAfter}
    </svg>
  );
}

SVGMap.propTypes = {
  // Map properties
  map: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        label: PropTypes.string,
      })
    ).isRequired,
    label: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  role: PropTypes.string,

  // Locations properties
  onLocationClick: PropTypes.func,

  // Slots
  childrenBefore: PropTypes.node,
  childrenAfter: PropTypes.node,
};

export default SVGMap;
