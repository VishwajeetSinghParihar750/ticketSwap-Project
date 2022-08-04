import { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <Fragment>
      {/* <div className="text-white bg-black pt-10 pb-10 px-5"> */}
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
          <ul className="flex ">
            <li className="mx-4">
              <a href="">Jobs</a>
            </li>
            <li className="mx-4">
              <a href="">How it works</a>
            </li>
            <li className="mx-4">
              <a href="">Login</a>
            </li>
            <li className="mx-4 ">
              <span className="px-6 pb-3 pt-3 bg-green rounded-lg">
                <Link href="/sell">Sell tickets</Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
}

export default Navbar;
