import React, { Fragment } from "react";
import Image from "next/dist/client/image";
import Link from "next/link";

function SellNavBar(props) {
  return (
    <div className="text-blue pt-4 pb-10 px-5">
      <div className="flex justify-between items-center font-medium">
        <div className="cursor-pointer">
          <Link href="/">
            <div className="text-size3 font-semibold flex cursor-pointer">
              <div className="mx-3 flex align-center">
                <Image
                  className="rounded-full"
                  src={`/images/header/siteLogo.png`}
                  width={`50px`}
                  height={`50px`}
                />
              </div>
              <p className="self-center">ticketswap</p>
            </div>
          </Link>
        </div>

        <div className="">
          <ul className="flex items-center">
            <li className="mx-4">
              <a href="">Help</a>
            </li>
            <li className="mx-4 px-4 py-3 rounded-lg text-base bg-blueLight">
              <a href="">Show Overview</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SellNavBar;
