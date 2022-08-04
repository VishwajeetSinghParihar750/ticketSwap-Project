import React from "react";
import { Fragment } from "react";
import SellNavBar from "../../components/sell/SellNavBar";
import SellSearchArea from "../../components/sell/sellSearchArea/SellSearchArea";
import SellBottom from "../../components/sell/SellBottom";
function Sell(props) {
  return (
    <Fragment>
      <SellNavBar />
      <SellSearchArea />
      <SellBottom />
    </Fragment>
  );
}

export default Sell;
