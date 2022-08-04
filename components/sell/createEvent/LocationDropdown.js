import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createEventActions } from "../../../store/createEventSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export default function LocationDropdown(props) {
  let locations = [];

  let dropdownRef = useRef();
  let dispatch = useDispatch();

  let name = useSelector((state) => state.createEvent.name);
  let venue = useSelector((state) => state.createEvent.venue);
  let locationInput = useSelector((state) => state.createEvent.locationInput);
  let showLocations = useSelector((state) => state.createEvent.showLocations);
  let date = useSelector((state) => state.createEvent.date);
  let month = useSelector((state) => state.createEvent.month);
  let year = useSelector((state) => state.createEvent.year);
  let time = useSelector((state) => state.createEvent.time);
  let facebookLink = useSelector((state) => state.createEvent.facebookLink);
  let tikcetshopLink = useSelector((state) => state.createEvent.tikcetshopLink);
  let isVisible = useSelector(
    (state) => state.createEvent.isLocationDropdownVisible
  );

  let handleOnChange = (e) => {
    dispatch(createEventActions.updateLocationInput(e.target.value));
  };

  useEffect(() => {
    let curTimeout = setTimeout(async () => {
      if (!locationInput) return;
      if (!isVisible) {
        dispatch(createEventActions.updateIsLocationDropdownVisible(true));
      }

      try {
        let request = `${NEXT_PUBLIC_API_ENDPOINT}/venues?q=${locationInput}&client_id=${NEXT_PUBLIC_MY_CLIENT_ID}&per_page=5`;
        let apiJsonResponse = await fetch(request);
        let locationsData = await apiJsonResponse.json();
        locations = locationsData.venues.map((location) => {
          return {
            id: location.id,
            name: location.name,
            location: location.display_location || location.city,
          };
        });
        dispatch(createEventActions.updateShowLocations(locations));
      } catch (e) {
        console.log(e);
      }
    }, 100);

    return () => clearTimeout(curTimeout);
  }, [locationInput]);

  let handleOptionClick = (e) => {
    if (venue.id) {
      dispatch(createEventActions.updateVenue({}));
      return;
    }

    let venueId = e.currentTarget.id;
    let selectedVenue = showLocations.find(
      (location) => location.id == venueId
    );

    dispatch(createEventActions.updateVenue(selectedVenue));
    dispatch(createEventActions.updateIsLocationDropdownVisible(false));
  };

  useEffect(() => {
    let checkIfClickedOutside = (e) => {
      if (isVisible && dropdownRef && !dropdownRef.current.contains(e.target)) {
        dispatch(createEventActions.updateIsLocationDropdownVisible(false));
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isVisible]);

  return (
    <Fragment>
      <div className="">
        {venue && !venue.id && (
          <li
            className="relative rounded-lg border-r border-borderColor flex justify-between items-center"
            id="location"
            ref={dropdownRef}
          >
            <div
              className="flex px-4 py-8 h-12 w-full bg-white2 items-center rounded-lg"
              onFocus={(e) => e.currentTarget.classList.add("focussedInput")}
              onBlur={(e) => e.currentTarget.classList.toggle("focussedInput")}
            >
              <span className="text-gray mr-4">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </span>
              <div>
                <input
                  className=" text-black bg-inherit"
                  type="text"
                  placeholder="Enter a venue name"
                  onChange={handleOnChange}
                  value={locationInput}
                />
              </div>
            </div>
            {isVisible && showLocations.length > 0 && (
              <div className="absolute top-full left-0 w-full drop-shadow-lg border-t border-borderColor rounded-l-lg overflow-hidden bg-white text-black cursor-pointer">
                <ul className="py-2 flex flex-col justify-center">
                  {showLocations.map((result) => {
                    return (
                      <li
                        key={result.id}
                        id={result.id}
                        className="flex py-2 px-3 hover:text-black w-full hover:bg-white2  cursor-pointer"
                        onClick={handleOptionClick}
                      >
                        <div className="flex flex-col">
                          <p className="text-sm">{result.name}</p>
                          <p>{result.location}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </li>
        )}
        {venue && venue.id && (
          <div
            className=" p-4 rounded-lg flex justify-between cursor-pointer bg-blueLight"
            onClick={handleOptionClick}
          >
            <div>
              <p>{venue.name}</p>
              <p className="text-sm">{venue.location}</p>
            </div>
            <div>
              <span className="">
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
