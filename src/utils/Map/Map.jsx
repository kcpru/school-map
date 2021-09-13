import React from "react";
import PropTypes from "prop-types";
import SVGMap from "./SVGMap";

function Map({
  map,
  className,
  locationAriaLabel,
  locationClassName,
  childrenBefore,
  childrenAfter,
}) {
  const handleLocationClick = (location) => {
    console.log(location.id, location.description);
  };

  return (
    <SVGMap
      map={map}
      role="radiogroup"
      locationRole="radio"
      className={className}
      locationClassName={locationClassName}
      locationAriaLabel={locationAriaLabel}
      onLocationClick={handleLocationClick}
      childrenBefore={childrenBefore}
      childrenAfter={childrenAfter}
    />
  );
}

Map.propTypes = {
  selectedLocationId: PropTypes.string,
  onChange: PropTypes.func,

  // SVGMap props
  map: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ).isRequired,
    label: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  locationClassName: PropTypes.string,
  locationAriaLabel: PropTypes.func,
  childrenBefore: PropTypes.node,
  childrenAfter: PropTypes.node,
};

export default Map;
