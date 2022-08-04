import React from "react";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Section2(props) {
  let imagesSectionInfo = [
    {
      imageUrl:
        "https://cdn.ticketswap.com/public/201404/e16b7006-4145-4919-b89d-3d66ebd6ab8f.png",
      locationName: "Ziggo Dome",
    },
    {
      imageUrl:
        "https://cdn.ticketswap.com/public/201704/5d34b48a-cae7-431a-aacd-2e376bc3517f.png",
      locationName: "Anterps Sportpaleis",
    },
    {
      imageUrl:
        "https://cdn.ticketswap.com/public/201606/84e09c8a-13ba-436f-9ab1-b48fa8293d78.png",
      locationName: "Budapest Park",
    },
    {
      imageUrl:
        "https://cdn.ticketswap.com/public/201601/af22f410-783e-4c5a-a33c-131121fb4af2.jpeg",
      locationName: "Zenith Paris - La Vilette",
    },
    {
      imageUrl:
        "https://cdn.ticketswap.com/public/201706/04fc3395-7932-43a9-bf93-44cb49ea9a4a.png",
      locationName: "3Arena",
    },
    {
      imageUrl:
        "https://cdn.ticketswap.com/public/201705/c25e526a-e24e-46fc-9981-2916c3c29d42.png",
      locationName: "Poble Espanyol de Barcelona",
    },
  ];

  return (
    <Fragment>
      <div>
        <div className="max-w-2xl mx-auto px-5 py-6">
          <div>
            <div className="mb-3">
              <p className="text-size3 font-bold">Browse events</p>
            </div>
            <ul>
              <li className="cursor-pointer">
                <Link href="/browse/today">
                  <div className="bg-white2 p-4 flex rounded-lg hover:bg-blueLight">
                    <div className="bg-mustard w-12 h-12 rounded-lg mr-4 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon="fa-solid fa-calendar-day"
                        style={{
                          color: "white",
                          height: "25px",
                        }}
                      />
                    </div>
                    <div className="leading-6">
                      <p className="font-semibold">Today</p>
                      <p className="text-gray text-size1">
                        Events taking place near you today
                      </p>
                    </div>
                  </div>
                </Link>
              </li>

              <li className="cursor-pointer">
                <Link href="/browse/this-weekend">
                  <div className="bg-white2 p-4  flex rounded-lg mt-2 hover:bg-blueLight">
                    <div className="bg-green w-12 h-12 rounded-lg mr-4 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon="fa-solid fa-calendar-week"
                        style={{
                          color: "white",
                          height: "25px",
                        }}
                      />
                    </div>
                    <div className="leading-6">
                      <p className="font-semibold">This Weekend</p>
                      <p className="text-gray text-size1">
                        Local events taking place on Friday, Satuday and Sunday
                      </p>
                    </div>
                  </div>
                </Link>
              </li>

              <li className="cursor-pointer">
                <Link href="/browse">
                  <div className="bg-white2 p-4 flex rounded-lg mt-2 hover:bg-blueLight">
                    <div className="bg-red w-12 h-12 rounded-lg mr-4 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon="fa-solid fa-calendar-days"
                        style={{
                          color: "white",
                          height: "25px",
                        }}
                      />
                    </div>
                    <div className="leading-6">
                      <p className="font-semibold">
                        Search by date, location or category
                      </p>
                      <p className="text-gray text-size1">
                        Find music or more, on a day that works for you
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-size3 font-bold">Discover</p>
            <p className="text-gray ">Discover our highlighted content</p>
          </div>
          <div className="mt-12">
            <p className="text-size3 font-bold">Events</p>
            <p className="text-gray ">Trending events in your area</p>
          </div>

          <div className="mt-12">
            <div className="">
              <p className="text-size3 font-bold">Locations</p>
              <p className="text-gray ">Popular event locations</p>
            </div>

            <div className="grid grid-cols-3 gap-2 leading-5 my-4">
              {imagesSectionInfo.map((card, index) => {
                return (
                  <div
                    key={index}
                    className=""
                    onClick={(event) => {
                      event.currentTarget.style.border = "5px solid #00b6f0";
                      event.currentTarget.style.borderRadius = "16px";
                    }}
                  >
                    <a href="" className="">
                      <div className=" h-36 rounded-xl overflow-hidden">
                        <div className="bg-white2 w-full h-full relative ">
                          <div className=" w-full h-full">
                            <img
                              src={`${card.imageUrl}`}
                              layout="fill"
                              className=" w-full h-full"
                            />
                          </div>
                          <div className="absolute top-0 left-0 w-full h-full shadow-mainPageLocationCardShadow text-white font-semibold flex items-end">
                            <div className="w-full h-max flex items-end hover:shadow-mainPageLocationCardShadow">
                              <div className="absolute inset-0 w-full h-full"></div>

                              <p className="p-4 hover:shadow-mainPageLocationCardShadow">
                                {card.locationName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <div className="">
              <p className="text-size3 font-bold mb-1">Categories</p>
              <p className="text-gray ">Find events by category</p>
            </div>
            <div className="grid grid-cols-2 gap-2 py-5">
              <a href="">
                <div
                  className="bg-white2 p-4 flex items-center rounded-lg  hover:bg-blueLight"
                  onClick={(event) => {
                    event.currentTarget.style.border = "5px solid #d6f3fc";
                    event.currentTarget.style.borderRadius = "16px";
                  }}
                >
                  <div className="bg-mustard w-9 h-9 rounded-lg mr-4 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon="fa-solid fa-sun"
                      style={{
                        color: "white",
                        height: "20px",
                      }}
                    />
                  </div>
                  <div className="leading-6 font-semibold">
                    <p>Festivals</p>
                  </div>
                </div>
              </a>
              <a href="">
                <div
                  className="bg-white2 p-4 flex items-center rounded-lg  hover:bg-blueLight"
                  onClick={(event) => {
                    event.currentTarget.style.border = "5px solid #d6f3fc";
                    event.currentTarget.style.borderRadius = "16px";
                  }}
                >
                  <div
                    className="bg-blue w-9 h-9 rounded-lg mr-4 flex items-center justify-center"
                    onClick={(event) => {
                      event.currentTarget.style.border = "5px solid #99e2f9";
                      event.currentTarget.style.borderRadius = "16px";
                    }}
                  >
                    <FontAwesomeIcon
                      icon="fa-solid fa-music"
                      style={{
                        color: "white",
                        height: "20px",
                      }}
                    />
                  </div>
                  <div className="leading-6 font-semibold">
                    <p>concerts</p>
                  </div>
                </div>
              </a>

              <a href="">
                <div
                  className="bg-white2 p-4 flex items-center rounded-lg  hover:bg-blueLight"
                  onClick={(event) => {
                    event.currentTarget.style.border = "5px solid #d6f3fc";
                    event.currentTarget.style.borderRadius = "16px";
                  }}
                >
                  <div className="bg-black w-9 h-9 rounded-lg mr-4 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon="fa-solid fa-champagne-glasses"
                      style={{
                        color: "white",
                        height: "20px",
                      }}
                    />
                  </div>
                  <div className="leading-6 font-semibold">
                    <p>Club Nights</p>
                  </div>
                </div>
              </a>

              <a href="">
                <div
                  className="bg-white2 p-4 flex items-center rounded-lg hover:bg-blueLight"
                  onClick={(event) => {
                    event.currentTarget.style.border = "5px solid #d6f3fc";
                    event.currentTarget.style.borderRadius = "16px";
                  }}
                >
                  <div className="bg-green w-9 h-9 rounded-lg mr-4 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon="fa-solid fa-trophy"
                      style={{
                        color: "white",
                        height: "20px",
                      }}
                    />
                  </div>
                  <div className="leading-6 font-semibold">
                    <p>Sports</p>
                  </div>
                </div>
              </a>
              <a href="">
                <div
                  className="bg-white2 p-4 flex items-center rounded-lg hover:bg-blueLight"
                  onClick={(event) => {
                    event.currentTarget.style.border = "5px solid #d6f3fc";
                    event.currentTarget.style.borderRadius = "16px";
                  }}
                >
                  <div className="bg-red w-9 h-9 rounded-lg mr-4 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon="fa-solid fa-masks-theater"
                      style={{
                        color: "white",
                        height: "20px",
                      }}
                    />
                  </div>
                  <div className="leading-6 font-semibold">
                    <p>Theater & Comedy</p>
                  </div>
                </div>
              </a>
              <a href="">
                <div
                  className="bg-white2 p-4 flex items-center rounded-lg hover:bg-blueLight"
                  onClick={(event) => {
                    event.currentTarget.style.border = "5px solid #d6f3fc";
                    event.currentTarget.style.borderRadius = "16px";
                  }}
                >
                  <div className="bg-gray w-9 h-9 rounded-lg mr-4 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon="fa-solid fa-tag"
                      style={{
                        color: "white",
                        height: "20px",
                      }}
                    />
                  </div>
                  <div className="leading-6 font-semibold">
                    <p>Vouchers and days out</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Fragment>
  );
}

export default Section2;
