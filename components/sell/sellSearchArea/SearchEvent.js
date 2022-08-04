import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sellSearchActions } from "../../../store/sellSearchSlice";
import { useEffect } from "react";
import Link from "next/dist/client/link";

const API_ENDPOINT = "https://api.seatgeek.com/2";
const API_ID = "MjcxMDE3OTB8MTY1MzI0MDg3MS40OTgzNTQy";

function SearchEvent(props) {
  const dispatch = useDispatch();

  const searchResults = useSelector((state) => state.sellSearch.results);
  const inputValue = useSelector((state) => state.sellSearch.input);
  const selectedEvent = useSelector((state) => state.sellSearch.selectedEvent);
  const perPage = useSelector((state) => state.sellSearch.resultsPerPage);
  useEffect(() => {
    let curTimeout = setTimeout(async () => {
      if (!inputValue) return;

      let events = [];
      let currentDate = new Date();

      try {
        let request = `${API_ENDPOINT}/events?q=${inputValue}&client_id=${API_ID}&per_page=${perPage}&datetime_utc.gte=${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;
        console.log(request);

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
            priceStats: eventInfo.stats,
          };
        });
      } catch (e) {
        console.log(e);
      }
      dispatch(sellSearchActions.updateResults(events));
    }, 100);

    return () => clearTimeout(curTimeout);
  }, [inputValue, perPage]);

  let handleOnChange = (e) => {
    dispatch(sellSearchActions.updateInputValue(e.target.value));
    if (perPage > 10) {
      dispatch(sellSearchActions.updateResultsPerPage(10));
    }
  };

  let handleEventClick = (e) => {
    if (selectedEvent.id) {
      dispatch(sellSearchActions.updateSelectedEvent({}));
      dispatch(sellSearchActions.updateSelectedTicket(""));
    } else {
      dispatch(
        sellSearchActions.updateSelectedEvent(
          searchResults.find((event) => event.id == e.currentTarget.id)
        )
      );
    }
  };

  let handleMoreClick = () => {
    dispatch(sellSearchActions.updateResultsPerPage(perPage + 10));
  };

  let selectedEventData = searchResults.find(
    (event) => event.id == selectedEvent.id
  );

  return (
    <Fragment>
      {!selectedEvent.id && (
        <Fragment>
          <form
            action=""
            className="w-full p-5 rounded-lg mx-auto relative bg-white2 mt-8"
          >
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
              />
            </div>
          </form>

          <div className="w-full">
            {searchResults.length > 0 && (
              <Fragment>
                <ul className=" my-5 flex flex-col items-start w-full">
                  <li className="text-gray text-sm font-medium pb-3 cursor-text">
                    {inputValue && <p>SEARCH RESULTS</p>}
                    {!inputValue && <p>RECENTLY VISITED</p>}
                  </li>
                  {searchResults.map((result, index) => {
                    return (
                      <li
                        key={result.id}
                        id={result.id}
                        data-index={index}
                        className="flex mb-2 hover:text-black bg-white2 w-full p-5 rounded-lg cursor-pointer"
                        onClick={handleEventClick}
                      >
                        <div className="flex flex-col items-start">
                          {result.title && (
                            <p className="text-xl leading-9">{result.title}</p>
                          )}
                          <p className="text-gray flex flex-wrap text-base">
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
                {inputValue && (
                  <div
                    className=" hover:opacity-50 cursor-pointer"
                    onClick={handleMoreClick}
                  >
                    <span className="bg-blue px-8 opacity-80 py-4 rounded-lg text-white font-semibold">
                      More results for {inputValue}
                    </span>
                  </div>
                )}
              </Fragment>
            )}
            {searchResults && searchResults.length == 0 && (
              <div className="mt-5 text-lg flex justify-center">
                <p className="">
                  Can’t find the event you’re looking for?
                  <span className="text-blue font-semibold">
                    <Link href={`/sell/createEvent`}> Add event</Link>
                  </span>
                </p>
              </div>
            )}
          </div>
        </Fragment>
      )}

      {selectedEvent.id && (
        <li
          id={selectedEvent}
          className="flex mb-2 hover:text-black w-full p-5 rounded-lg cursor-pointer mt-10 bg-blueLight"
          onClick={handleEventClick}
        >
          <div className="flex flex-col items-start w-full">
            {selectedEventData && selectedEventData.title && (
              <p className="text-xl leading-9 w-full flex justify-between">
                <span className="flex flex-wrap">
                  {selectedEventData.title}
                </span>
                <span className="">
                  <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </span>
              </p>
            )}
            <p className="text-gray flex flex-wrap text-base">
              {selectedEventData && selectedEventData.date && (
                <span className="addDotAfter flex items-center">
                  {selectedEventData.date}
                </span>
              )}{" "}
              {selectedEventData && selectedEventData.venueName && (
                <span>{selectedEventData.venueName}</span>
              )}
              {selectedEventData && selectedEventData.city && (
                <span>, {selectedEventData.city}</span>
              )}
              {selectedEventData && selectedEventData.state && (
                <span>, {selectedEventData.state}</span>
              )}
            </p>
          </div>
        </li>
      )}
    </Fragment>
  );
}

export default SearchEvent;
