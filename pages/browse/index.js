import React, { Fragment, useEffect } from "react";
import BrowseHeader from "../../components/browse/BrowseHeader";
import LocationDropdown from "../../components/browse/searchDropdown/LocationDropdown";
import DateDropdown from "../../components/browse/searchDropdown/DateDropdown";
import CategoryDropdown from "../../components/browse/searchDropdown/CategoryDropdown";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { browseResultsActions } from "../../store/browseResultsSlice";
import FancyDate from "../../components/ui/FancyDate";

function Index(props) {
  let dispatch = useDispatch();

  let searchResults = useSelector((state) => state.browseResult.searchResults);

  let category = useSelector((state) => state.browseSearch.selectedCategory);
  let date = useSelector((state) => state.browseSearch.selectedDate);
  let location = useSelector((state) => state.browseSearch.selectedLocation);

  useEffect(() => {
    let results = [];

    setTimeout(async () => {
      try {
        let req = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/events?${
          category.id ? `taxonomies.id=${category.id}` : ""
        }${location.id ? `&venue.id=${location.id}` : ""}`;
        req += `&per_page=10&client_id=${process.env.NEXT_PUBLIC_MY_CLIENT_ID}`;
        let jsonResponse = await fetch(req);
        let responseData = await jsonResponse.json();
        let resEvents = responseData.events;
        results = resEvents.map((event) => {
          return {
            id: event.id,
            date: new Date(Date.parse(event.datetime_utc)).toDateString(),
            location: event.venue.display_location,
            venueName: event.venue.name,
            shortTitle: event.short_title,
            title: event.title,
          };
        });

        dispatch(browseResultsActions.setSearchResults(results));
      } catch (e) {
        console.log(e);
      }
    }, 0);
  }, [location, category]);

  return (
    <div className="relative">
      <Fragment>
        <BrowseHeader />
      </Fragment>
      <div className=" relative z-[100]">
        <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%] w-full max-w-3xl bg-white text-black rounded-lg shadow-lg">
          <ul className="w-full flex">
            <LocationDropdown />
            <DateDropdown />
            <CategoryDropdown />
          </ul>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto mt-32 mb-20 relative px-5">
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result) => {
              return (
                <li
                  id="result.id"
                  key={result.id}
                  className="flex p-3 bg-white2 hover:bg-blueLight cursor-pointer my-3 rounded-lg "
                >
                  <div className="">
                    <FancyDate date={result.date} />
                  </div>
                  <div className="flex flex-col ">
                    <p className="font-semibold">
                      {result.shortTitle || result.title}
                    </p>
                    <p className="text-gray text-sm">
                      {result.venueName}, {result.location}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {searchResults && searchResults.length == 0 && (
          <div className="">
            <h1 className="text-3xl font-bold">No events found</h1>
            <p className="text-gray mt-2 text-xl">
              Your filters did not yield any results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
