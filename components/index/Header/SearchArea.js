import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { headerSearchActions } from "../../../store/headerSearchSlice";
import { useEffect, useRef } from "react";

function SearchArea(props) {
  let dropdownRef = useRef();
  const dispatch = useDispatch();

  const searchResults = useSelector(
    (state) => state.headerSearch.headerSearchResults
  );
  const inputValue = useSelector(
    (state) => state.headerSearch.headerInputValue
  );
  const isVisible = useSelector(
    (state) => state.headerSearch.isHeaderSearchResultsVisible
  );

  useEffect(() => {
    let curTimeout = setTimeout(async () => {
      if (!inputValue) return;

      let events = [];
      let currentDate = new Date();

      try {
        let request = `${
          process.env.NEXT_PUBLIC_API_ENDPOINT
        }/events?q=${inputValue}&client_id=${
          process.env.NEXT_PUBLIC_MY_CLIENT_ID
        }&per_page=5&datetime_utc.gte=${currentDate.getUTCFullYear()}-${
          currentDate.getUTCMonth() + 1
        }-${currentDate.getUTCDate()}`;
        let apiJsonResponse = await fetch(request);
        let eventsData = await apiJsonResponse.json();
        events = eventsData.events.map((eventInfo) => {
          return {
            id: eventInfo.id,
            title: eventInfo.short_title || eventInfo.title,
            venueName: eventInfo.venue.name,
            city: eventInfo.venue.city,
            date: new Date(Date.parse(eventInfo.datetime_utc)).toDateString(),
            state: eventInfo.venue.state,
          };
        });
      } catch (e) {
        console.log(e);
      }
      dispatch(headerSearchActions.updateResults(events));
    }, 100);

    return () => clearTimeout(curTimeout);
  }, [inputValue]);

  let handleOnChange = (e) => {
    dispatch(headerSearchActions.updateInputValue(e.target.value));
  };

  useEffect(() => {
    let checkIfClickedOutside = (e) => {
      if (isVisible && dropdownRef && !dropdownRef.current.contains(e.target)) {
        dispatch(headerSearchActions.updateIsVisible(false));
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isVisible]);

  let handleOnClick = (e) => {
    dispatch(headerSearchActions.updateIsVisible(true));
  };

  return (
    <Fragment>
      <div className="flex items-center w-full justify-center h-full">
        <div className="flex flex-col w-full items-center text-center py-5">
          {!props.hideContent && (
            <div className="font-bold mb-8 text-size3 lg:text-size4">
              <p>The safest way to buy and sell tickets</p>
            </div>
          )}
          <div className="w-full relative" ref={dropdownRef}>
            <form action="" className="max-w-2xl w-full mx-auto relative ">
              <div className="flex p-4 rounded-lg w-full bg-white">
                <span className="text-gray mr-4">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </span>
                <input
                  className=" text-black flex-1"
                  type="text"
                  placeholder="Search for events, venues and cities"
                  onChange={handleOnChange}
                  value={inputValue}
                  onClick={handleOnClick}
                />
              </div>
              {isVisible && searchResults.length > 0 && (
                <div className="absolute w-full mt-1 z-[1000] drop-shadow-lg rounded-lg overflow-hidden bg-white text-blue cursor-pointer">
                  <ul className="px-5 pt-5 flex flex-col items-start">
                    <li className="text-gray text-sm font-medium pb-3 cursor-text">
                      {inputValue && <p>SEARCH RESULTS</p>}
                      {!inputValue && <p>RECENTLY VISITED</p>}
                    </li>
                    {searchResults.map((result) => {
                      return (
                        <li
                          key={result.id}
                          className="flex mb-5 hover:text-black"
                        >
                          <div className="pt-2 pr-5">
                            <FontAwesomeIcon
                              icon="fa-solid fa-calendar-plus"
                              style={{ fontSize: "20px" }}
                            />
                          </div>

                          <div className="flex flex-col items-start">
                            {result.title && (
                              <p className="text-xl leading-9">
                                {result.title}
                              </p>
                            )}
                            <p className="text-gray flex flex-wrap">
                              {result.date && (
                                <span className="addDotAfter flex items-center">
                                  {result.date}
                                </span>
                              )}{" "}
                              {result.venueName && (
                                <span>{result.venueName}</span>
                              )}
                              {result.city && <span>, {result.city}</span>}
                              {result.state && <span>, {result.state}</span>}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-borderColor py-5 hover:text-black">
                    <p className="self-center">Show more results</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SearchArea;
