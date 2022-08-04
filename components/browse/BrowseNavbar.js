import Image from "next/dist/client/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchArea from "../index/Header/SearchArea";
import { browseSearchActions } from "../../store/browseSearchSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Fragment } from "react";
import Link from "next/dist/client/link";

export default function BrowseNavbar(props) {
  const dispatch = useDispatch();
  const isSearchBarActive = useSelector(
    (state) => state.browseSearch.isSearchBarActive
  );

  let handleWrapperClick = () => {
    dispatch(browseSearchActions.setIsSearchBarActive(false));
  };
  return (
    <Fragment>
      {isSearchBarActive && (
        <Fragment>
          <div
            className="fixed inset-0 w-full h-full z-[1001] bg-[#000] opacity-50"
            onClick={handleWrapperClick}
          ></div>
          <div className="absolute top-0 w-full max-w-full translate-x-[-40px] z-[9999] ">
            <SearchArea hideContent={true} />
          </div>
        </Fragment>
      )}
      <div className="flex justify-between items-center font-medium">
        <div className="text-size3 font-semibold flex">
          <div className="mx-3 flex align-center">
            <Image
              className="rounded-full"
              src={`/images/header/siteLogo.png`}
              width={`50px`}
              height={`50px`}
            />
          </div>
          <p className="self-center">
            <Link href={"/"}>ticketswap</Link>
          </p>
        </div>
        <div className="">
          <ul className="flex ">
            <li
              className="mx-4 cursor-pointer"
              onClick={() => {
                dispatch(browseSearchActions.setIsSearchBarActive(true));
                console.log("yep");
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </li>
            <li className="mx-4">
              <a href="">How it works</a>
            </li>
            <li className="mx-4">
              <a href="">Login</a>
            </li>
            <li className="mx-4">
              <Link href="/sell">
                <span className="px-6 pb-3 pt-3 bg-green rounded-lg cursor-pointer">
                  Sell tickets
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
