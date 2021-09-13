import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { setLocation } from "../../store/slices/locationSlice";
import SVGMap from "./SVGMap";

function Map({
  map,
  className,
  locationAriaLabel,
  locationClassName,
  childrenBefore,
  childrenAfter,
}) {
  const dispatch = useDispatch();
  const _location = useSelector(state=> state.location)
  const {id, name} = _location;

  const handleLocationClick = (location) => {
    console.log({id, name});
    dispatch(setLocation(location));
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
