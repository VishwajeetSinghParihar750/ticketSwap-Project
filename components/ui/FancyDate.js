import React from "react";

function FancyDate(props) {
  let dateInfo = props.date.split(" ");
  return (
    <div className="flex flex-col items-center bg-white rounded-md overflow-hidden mr-3 drop-shadow-md ">
      <div className="text-[10px] font-bold text-white bg-red px-3 ">
        <p>{dateInfo[1]}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[12px] font-bold">{dateInfo[2]}</p>
        <p className="text-[8px] font-semibold">{dateInfo[3]}</p>
      </div>
    </div>
  );
}

export default FancyDate;
