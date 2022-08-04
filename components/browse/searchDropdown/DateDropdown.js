import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { browseSearchActions } from "../../../store/browseSearchSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export default function DateDropdown(props) {
  let dropdownRef = useRef();
  let showButtonRef = useRef();
  let dispatch = useDispatch();

  let dateResults = [
    "Today",
    "Tomorrow",
    "This weekend",
    "This week",
    "Next week",
    "This month",
    "Anytime",
    "Pick a day",
  ];
  let isVisible = useSelector((state) => state.browseSearch.isDateVisible);
  let selectedDate = useSelector((state) => state.browseSearch.selectedDate);

  let handleOnClick = (e) => {
    if (isVisible && dropdownRef && dropdownRef.current.contains(e.target)) {
      return;
    }
    dispatch(browseSearchActions.setIsDateVisible(!isVisible));
  };

  // let handleOptionClick = (e) => {
  //   let index = e.currentTarget.name;

  //   dispatch(browseSearchActions.setSelectedDate({}));
  //   dispatch(browseSearchActions.setIsDateVisible(false));
  // };

  useEffect(() => {
    let checkIfClickedOutside = (e) => {
      if (
        isVisible &&
        dropdownRef &&
        !dropdownRef.current.contains(e.target) &&
        !showButtonRef.current.contains(e.target)
      ) {
        dispatch(browseSearchActions.setIsDateVisible(false));
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isVisible]);

  return (
    <Fragment>
      <li
        className="w-1/3 relative hover:bg-white2 p-4 border-r border-borderColor flex justify-between items-center cursor-pointer"
        onClick={handleOnClick}
        id="date"
        ref={showButtonRef}
      >
        <div className="flex">
          <div className="bg-green w-12 h-12 rounded-lg mr-4 flex items-center justify-center">
            <FontAwesomeIcon
              icon="fa-solid fa-calendar-day"
              style={{
                color: "white",
                height: "25px",
                width: "25px",
              }}
            />
          </div>
          <div className="">
            <p className="font-semibold">Date</p>
            <p className="text-sm leading-3 text-gray">
              {selectedDate || "Any"}
            </p>
          </div>
        </div>
        <div>
          <FontAwesomeIcon
            icon="fa-solid fa-caret-down"
            style={{ color: "gray" }}
          />
        </div>
        {isVisible && (
          <div
            className="absolute top-full left-0 w-full z-[1000] drop-shadow-lg border-t border-borderColor rounded-l-lg overflow-hidden bg-white text-black cursor-pointer"
            ref={dropdownRef}
          >
            <ul className="py-2 flex flex-col justify-center">
              {dateResults.map((result, index) => {
                return (
                  <li
                    name={index}
                    key={index}
                    className="flex py-2 px-3 hover:text-black w-full hover:bg-white2"
                    // onClick={handleOptionClick}
                  >
                    <div className="flex flex-col">
                      <p>{result}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    </Fragment>
  );
}
