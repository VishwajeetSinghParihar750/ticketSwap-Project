import { Fragment } from "react";

import SearchEvent from "./SearchEvent";
import TicketType from "./TicketType";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function SellSearchArea(props) {
  const selectedEvent = useSelector((state) => state.sellSearch.selectedEvent);
  const selectedTicket = useSelector(
    (state) => state.sellSearch.selectedTicket
  );

  return (
    <Fragment>
      <div className="flex flex-col w-full mx-auto max-w-3xl p-5">
        <div>
          <p className="font-bold text-6xl mb-2">Select event</p>
          <p className="text-2xl text-gray">
            Which event would you like to sell tickets for, 20bcs053_?
          </p>
        </div>

        <SearchEvent />

        {selectedEvent.id && <TicketType />}

        <div className="flex justify-end my-8">
          <span
            className={
              `px-8 py-4 bg-blue rounded-lg text-white font-semibold` +
              (selectedTicket ? ` opacity-80 cursor-pointer ` : ` opacity-50 `)
            }
          >
            Create Listing
          </span>
        </div>
      </div>
    </Fragment>
  );
}
