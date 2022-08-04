import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { createEventActions } from "../../../store/createEventSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import LocationDropdown from "./LocationDropdown";

function CreateEvent(props) {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(createEventActions.updateDate(new Date().getDate()));

    let month = new Date().getMonth() + 1;
    if (month < 10) {
      month = `0` + month;
    }
    dispatch(createEventActions.updateMonth(month));
    dispatch(createEventActions.updateYear(new Date().getFullYear()));

    let hrs = new Date().getHours();
    let min = new Date().getMinutes();
    if (+hrs < 10) {
      hrs = "0" + hrs;
    }
    if (+min < 10) {
      min = "0" + min;
    }

    dispatch(createEventActions.updateTime(hrs + `:` + min));
  }, []);

  let name = useSelector((state) => state.createEvent.name);
  let date = useSelector((state) => state.createEvent.date);
  let month = useSelector((state) => state.createEvent.month);
  let year = useSelector((state) => state.createEvent.year);
  let time = useSelector((state) => state.createEvent.time);
  let facebookLink = useSelector((state) => state.createEvent.facebookLink);
  let ticketshopLink = useSelector((state) => state.createEvent.tikcetshopLink);

  let handleOnChange = (e) => {
    let inputValue = e.target.value;
    if (e.currentTarget.id == "newEventName") {
      dispatch(createEventActions.updateName(inputValue));
    } else if (e.currentTarget.id == "newEventDate") {
      dispatch(createEventActions.updateDate(inputValue));
    } else if (e.currentTarget.id == "newEventMonth") {
      let separated = inputValue.split("-");
      let year = separated[0];
      let month = separated[1];

      dispatch(createEventActions.updateYear(year));
      dispatch(createEventActions.updateMonth(month));
    } else if (e.currentTarget.id == "newEventTime") {
      dispatch(createEventActions.updateTime(inputValue));
    } else if (e.currentTarget.id == "newEventFacebookLink") {
      dispatch(createEventActions.updateFacebookLink(inputValue));
    } else if (e.currentTarget.id == "newEventTicketshopLink") {
      dispatch(createEventActions.updateTicketshopLink(inputValue));
    }
  };

  let handleContinueClick = (e) => {
    console.log("Continue");
    // add the event to database
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 mb-14">
      <p className="text-5xl font-bold">Add new event</p>
      <div className="mt-8">
        <p className="py-1">Official name</p>
        <input
          type="text"
          name="name"
          id="newEventName"
          className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
          value={name}
          onChange={handleOnChange}
          placeholder="E.g. MysteryLand 2023"
          required
          onFocus={(e) => e.target.classList.add("focussedInput")}
          onBlur={(e) => e.target.classList.toggle("focussedInput")}
        />
      </div>
      <div className="mt-8">
        <p className="py-1">Venue</p>
        <LocationDropdown />
      </div>
      <div className="mt-8">
        <p className="py-1">Date and Time</p>
        <div className="flex justify-around">
          <div className=" bg-white2 rounded-lg mr-5">
            <input
              type="number"
              id="newEventDate"
              name="tentacles"
              min={1}
              max={31}
              className="flex px-4 py-8 h-12 w-max bg-white2 items-center rounded-lg"
              required
              onChange={handleOnChange}
              value={date}
              onFocus={(e) => e.target.classList.add("focussedInput")}
              onBlur={(e) => e.target.classList.toggle("focussedInput")}
            />
          </div>
          <div className="flex-1 bg-white2 rounded-lg mr-5">
            <input
              type="month"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
              id="newEventMonth"
              required
              onChange={handleOnChange}
              value={year + `-` + month}
              onFocus={(e) => e.target.classList.add("focussedInput")}
              onBlur={(e) => e.target.classList.toggle("focussedInput")}
            />
          </div>
          <div className="flex-1 bg-white2 rounded-lg">
            <input
              type="time"
              className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
              placeholder="12:00"
              required
              id="newEventTime"
              onChange={handleOnChange}
              value={time}
              onFocus={(e) => e.target.classList.add("focussedInput")}
              onBlur={(e) => e.target.classList.toggle("focussedInput")}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="py-1">Link to Facebook event-page (optional)</p>
        <input
          type="url"
          placeholder="https://facebook.com/example"
          pattern="https://.*  "
          name="facebookLink"
          id="newEventFacebookLink"
          className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
          value={facebookLink}
          onChange={handleOnChange}
          onFocus={(e) => e.target.classList.add("focussedInput")}
          onBlur={(e) => e.target.classList.toggle("focussedInput")}
        />
      </div>
      <div className="mt-8">
        <p className="py-1">Link to eventss ticketshop (optional)</p>
        <input
          type="url"
          name="ticketshopLink"
          placeholder="https://example.com"
          pattern="https://.*"
          id="newEventTicketshopLink"
          className="flex px-4 py-8 h-12  w-full bg-white2 items-center rounded-lg"
          value={ticketshopLink}
          onChange={handleOnChange}
          onFocus={(e) => e.target.classList.add("focussedInput")}
          onBlur={(e) => e.target.classList.toggle("focussedInput")}
          onLoadedMetadata
        />
      </div>

      <div className="flex justify-between my-8">
        <Link href="/sell">
          <span
            className={`px-8 py-4 bg-blueLight text-blue rounded-lg  font-semibold cursor-pointer hover:opacity-70`}
          >
            <span className="p-4">
              <FontAwesomeIcon icon="fa-solid fa-angle-left" />
            </span>
            Back
          </span>
        </Link>
        <Link href="/sell">
          <span
            className={`px-8 py-4 bg-green opacity-80 rounded-lg text-white font-semibold cursor-pointer hover:opacity-70`}
            onClick={handleContinueClick}
          >
            Continue
          </span>
        </Link>
      </div>

      <div className="bg-blueLight px-4 py-3 rounded-lg">
        <span className="text-blue text-xl mr-8">
          <FontAwesomeIcon icon="fa-solid fa-circle-exclamation" />
        </span>
        <span>
          Your event will not be visible immediately, as it needs to be verified
          first.
        </span>
      </div>
    </div>
  );
}

export default CreateEvent;
