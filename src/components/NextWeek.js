import React from "react";

const NextWeek = (props) => {
  const convert = (date) => {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(date);
    return days[d.getDay()];
  };

  return (
    <div className="nextWeek">
      <div id="day">{convert(props.date)}</div>
      <div>{props.forecast}</div>
      <div>{props.temp}</div>
    </div>
  );
};

export default NextWeek;