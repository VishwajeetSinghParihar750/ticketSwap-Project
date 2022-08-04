import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { browseSearchActions } from "../../../store/browseSearchSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

function LocationDropdown(props) {
  let dropdownRef = useRef();
  let dispatch = useDispatch();

  let locationsResult = useSelector((state) => state.browseSearch.locations);
  let locationInput = useSelector((state) => state.browseSearch.locationInput);
  let isVisible = useSelector((state) => state.browseSearch.isLocationVisible);
  let selectedLocation = useSelector(
    (state) => state.browseSearch.selectedLocation
  );

  let handleOnChange = (e) => {
    dispatch(browseSearchActions.setLocationInput(e.target.value));
  };

  let handleOnClick = (e) => {
    dispatch(browseSearchActions.setIsLocationVisible(true));
  };

  let handleOptionClick = (e) => {
    let venueId = e.currentTarget.id;

    let name = locationsResult.find((location) => location.id == venueId)
      .location;
    dispatch(
      browseSearchActions.setSelectedLocation({
        id: venueId,
        name: name,
      })
    );
    dispatch(browseSearchActions.setIsLocationVisible(false));
  };

  useEffect(() => {
    let curTimeout = setTimeout(async () => {
      if (!locationInput) return;

      let locations = [];

      try {
        let request = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/venues?q=${locationInput}&client_id=${process.env.NEXT_PUBLIC_MY_CLIENT_ID}&per_page=5`;
        let apiJsonResponse = await fetch(request);
        let locationsData = await apiJsonResponse.json();
        locations = locationsData.venues.map((location) => {
          return {
            id: location.id,
            name: location.name,
            location: location.display_location || location.city,
          };
        });
      } catch (e) {
        console.log(e);
      }
      dispatch(browseSearchActions.showLocations(locations));
    }, 100);

    return () => clearTimeout(curTimeout);
  }, [locationInput]);

  useEffect(() => {
    let checkIfClickedOutside = (e) => {
      if (isVisible && dropdownRef && !dropdownRef.current.contains(e.target)) {
        dispatch(browseSearchActions.setIsLocationVisible(false));
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isVisible]);

  return (
    <Fragment>
      <div className="w-1/3">
        {!isVisible && (
          <li
            className=" relative hover:bg-blueLight rounded-l-lg p-4 border-r border-borderColor flex justify-between items-center cursor-pointer"
            onClick={handleOnClick}
            id="location"
          >
            <div className="flex">
              <div className="bg-blue h-12 w-12 rounded-lg  mr-4 flex items-center justify-center">
                <FontAwesomeIcon
                  icon="fa-solid fa-location-dot"
                  style={{
                    color: "white",
                    height: "25px",
                    width: "25px",
                  }}
                />
              </div>
              <div className="">
                <p className="font-semibold">Location</p>
                <p className="text-sm leading-3 text-gray">
                  {selectedLocation.name || "Any"}
                </p>
              </div>
            </div>
            <div>
              <FontAwesomeIcon
                icon="fa-solid fa-caret-down"
                style={{ color: "gray" }}
              />
            </div>
          </li>
        )}
        {isVisible && (
          <li
            className="relative p-4 rounded-lg border-r border-borderColor flex justify-between items-center cursor-pointer"
            id="location"
            ref={dropdownRef}
          >
            <div className="flex px-3 h-12  w-full bg-white2 items-center rounded-lg">
              <span className="text-gray mr-4">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </span>
              <div>
                <input
                  className=" text-black bg-inherit text-base"
                  type="text"
                  placeholder="Search your venue"
                  onChange={handleOnChange}
                  value={locationInput}
                />
              </div>
            </div>
            {locationsResult.length > 0 && (
              <div className="absolute top-full left-0 w-full drop-shadow-lg border-t border-borderColor rounded-l-lg overflow-hidden bg-white text-black cursor-pointer">
                <ul className="py-2 flex flex-col justify-center">
                  {locationsResult.map((result) => {
                    return (
                      <li
                        key={result.id}
                        id={result.id}
                        className="flex py-2 px-3 hover:text-black w-full hover:bg-white2 "
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
      </div>
    </Fragment>
  );
}

export default LocationDropdown;
