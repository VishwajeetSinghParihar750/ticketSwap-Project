import React from "react";
import Image from "next/dist/client/image";
import BrowseNavbar from "../browse/BrowseNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";

export default function EventHeader(props) {
  let router = useRouter();
  let eventId = router.query.eventId;

  return (
    <div className="text-white bg-[#1a2129]  pt-4 pb-10 px-5 relative">
      <BrowseNavbar />
    </div>
  );
}
