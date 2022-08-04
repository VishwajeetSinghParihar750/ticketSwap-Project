import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SellBottom(props) {
  return (
    <div className="">
      <div className="max-w-3xl mx-auto py-10 px-2 mb-10 flex justify-between border-t border-borderColor">
        <div className=" text-size1 ">
          <ul>
            <li className="flex items-center mb-4">
              <span className="text-blue px-4">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </span>
              <div>
                <p className="font-medium">Tickets are protected</p>
                <p className="text-gray ">
                  Fans can only access tickets after they have been paid for
                </p>
              </div>
            </li>
            <li className="flex items-center mb-4">
              <span className="text-blue px-4">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </span>
              <div>
                <p className="font-medium">Payment is fast</p>
                <p className="text-gray ">
                  The money is transferred within 3 business days
                </p>
              </div>
            </li>
            <li className="flex items-center">
              <span className="text-blue  px-4">
                <FontAwesomeIcon icon="fa-solid fa-check" />
              </span>
              <div>
                <p className="font-medium">We are trusted by millions</p>
                <p className="text-gray ">Over 7 million fans use TicketSwap</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="self-center justify-self-center p-5 ">
          <img
            src="https://cdn.ticketswap.com/static/images/stars.svg"
            alt=""
          />
          <p className="font-semibold pt-3">
            Great on
            <a href="" className="text-blue">
              {" "}
              Trustpilot
            </a>
          </p>
          <p className="text-size1 text-gray">2300+ reviews</p>
        </div>
      </div>
    </div>
  );
}

export default SellBottom;
