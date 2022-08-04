import React from "react";
import SellNavBar from "../../components/sell/SellNavBar";
import SellBottom from "../../components/sell/SellBottom";
import CreateEvent from "../../components/sell/createEvent/CreateEvent";
function createEvent(props) {
  return (
    <div>
      <SellNavBar />
      <CreateEvent />
      <SellBottom />
    </div>
  );
}

export default createEvent;
