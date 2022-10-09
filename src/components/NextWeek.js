import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const NextWeek = (props) => {
  const isMetric = useSelector((state) => state.isMetric);
  const [weeklyWeather, setWeeklyWeather] = useState(null);
  const [isError, setIsError] = useState(false); // TODO: add error rendring

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

  const getWeeklyForcast = () => {
    axios
      .get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${props.cityKey}?apikey=z8L1GEx871whuVrAK9FCvPIq0szzdUlW&metric=${isMetric.value}`
      )
      .then(function (response) {
        // handle success
        setWeeklyWeather(response.data);
        setIsError(false);
      })
      .catch(function (error) {
        // handle error
        setIsError(true);
      });
  };

  useEffect(() => {
    getWeeklyForcast();
  }, [isMetric, props.cityKey]);

  return (
    <>
      {isError ? (
        <div className="error">An error has occured, please refresh</div>
      ) : (
        <div className="newWeek">
          {weeklyWeather != null ? (
            weeklyWeather.DailyForecasts.map((day) => {
              return (
                <div className="nextWeek">
                  <div className="dayOfWeek">
                    <div id="day">{convert(day.Date)}</div>
                    <div>
                      {day.Temperature.Maximum.Value.toFixed(0) +
                        "°" +
                        day.Temperature.Maximum.Unit}
                    </div>
                    <div>{day.Day.IconPhrase}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="loading">Loading weekly forcast</div>
          )}
        </div>
      )}
    </>
  );
};

export default NextWeek;
