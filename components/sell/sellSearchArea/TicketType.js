import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sellSearchActions } from "../../../store/sellSearchSlice";
import { useEffect } from "react";
import Link from "next/dist/client/link";

function TicketType(props) {
  let dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.sellSearch.selectedEvent);
  const selectedTicket = useSelector(
    (state) => state.sellSearch.selectedTicket
  );
  const pricing = selectedEvent.priceStats;

  let handleTicketClick = (e) => {
    if (selectedTicket) {
      dispatch(sellSearchActions.updateSelectedTicket(""));
    } else {
      dispatch(sellSearchActions.updateSelectedTicket(e.currentTarget.id));
    }
  };

  let tickets = [
    { id: "vip", price: pricing.highest_price, name: "VIP Seating" },
    { id: "regular", price: pricing.average_price, name: "Regular" },
    { id: "obstructed", price: pricing.lowest_price, name: "Obstructed View" },
  ];

  let selectedTicketData = tickets.find(
    (ticket) => ticket.id == selectedTicket
  );

  return (
    <div>
      <div className="my-5">
        <p className="text-2xl">What kind of tickets do you have?</p>
        <p className="text-gray">
          Keep in mind that you can only sell tickets for one type at a time. If
          you have multiple types of tickets, you’ll need to create a separate
          listing for each of them.
        </p>
      </div>
      {!selectedTicket && (
        <Fragment>
          <div className="">
            {tickets.map((ticket) => {
              return (
                <p
                  className="p-5 text-xl bg-white2 rounded-lg my-2 cursor-pointer w-full flex justify-between"
                  id={ticket.id}
                  key={ticket.id}
                  onClick={handleTicketClick}
                >
                  {ticket.name}
                  {ticket.price && ` - $${ticket.price}`}
                </p>
              );
            })}
          </div>
        </Fragment>
      )}

      {selectedTicket && (
        <p
          className="p-5 text-xl rounded-lg my-2 cursor-pointer w-full flex justify-between bg-blueLight "
          id={selectedTicket}
          onClick={handleTicketClick}
        >
          <span className="flex flex-wrap">
            {selectedTicketData.name}
            {selectedTicketData.price && ` - $${selectedTicketData.price}`}
          </span>
          <span className="">
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </span>
        </p>
      )}
    </div>
  );
}

export default TicketType;
