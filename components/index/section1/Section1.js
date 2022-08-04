import React from "react";

import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Section1(props) {
  return (
    <Fragment>
      <div className=" border-b-[1px] border-[#e5e7e8]">
        <div className="max-w-2xl mx-auto py-8 px-5 flex justify-between">
          <div className="text-size1 font-medium w-[53%]">
            <ul>
              <li className="flex items-center mb-2">
                <span className="text-blue px-4">
                  <FontAwesomeIcon icon="fa-solid fa-check" />
                </span>
                <p>
                  The safest way to buy and sell tickets with over 7 million
                  fans
                </p>
              </li>
              <li className="flex items-center mb-2">
                <span className="text-blue px-4">
                  <FontAwesomeIcon icon="fa-solid fa-check" />
                </span>
                <p>Prices are capped at 120% of the original price</p>
              </li>
              <li className="flex items-center">
                <span className="text-blue  px-4">
                  <FontAwesomeIcon icon="fa-solid fa-check" />
                </span>
                <p>Primary tickets from over 6000 partnered events</p>
              </li>
            </ul>
          </div>
          <div className="self-center mx-auto px-10">
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
    </Fragment>
  );
}

export default Section1;
