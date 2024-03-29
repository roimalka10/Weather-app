import React, { useState, useEffect } from "react";
import NextWeek from "./NextWeek";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { create, remove } from "../store/favourites";
import { motion } from "framer-motion";

const CurrentWeather = (props) => {
  const isMetric = useSelector((state) => state.isMetric);
  const favourites = useSelector((state) => state.favourites);

  const [cityWeather, setCityWeather] = useState(null);
  const [showFavourite, setShowFavourite] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const HandleClick = () => {
    const isFavour = favourites.find((fav) => fav.Key === props.cityKey);
    if (isFavour) {
      dispatch(remove(props.cityKey));
    } else {
      dispatch(
        create({
          Key: props.cityKey,
          Name: props.cityName, // we pass this data to save with http requests
        })
      );
    }
  };

  useEffect(() => {
    const index = favourites.findIndex((fav) => fav.Key === props.cityKey);
    if (index !== -1) {
      setShowFavourite(true);
    } else {
      setShowFavourite(false);
    }
  }, [favourites, props.cityKey]);

  useEffect(() => {
    axios
      .get(
        `https://dataservice.accuweather.com/currentconditions/v1/${props.cityKey}?apikey=z8L1GEx871whuVrAK9FCvPIq0szzdUlW`
      )
      .then(function (response) {
        setCityWeather(response.data[0]);
        setIsError(false);
      })
      .catch(function (error) {
        setIsError(true);
      });
  }, [props.cityKey]);

  return (
    <>
      {isError ? (
        <div className="error">An error has occured, please refresh</div>
      ) : (
        <div>
          {cityWeather != null ? (
            <motion.div className="weatherMain">
              <div className="details">
                {" "}
                <div className="cityDetails">
                  <div className="cityTemp">
                    {isMetric.value
                      ? cityWeather.Temperature.Metric.Value.toFixed(0) +
                        "°" +
                        cityWeather.Temperature.Metric.Unit
                      : cityWeather.Temperature.Imperial.Value.toFixed(0) +
                        "°" +
                        cityWeather.Temperature.Imperial.Unit}
                  </div>
                  <div className="cityText">
                    <div>{cityWeather.WeatherText}</div>
                    <div>{props.cityName}</div>
                  </div>
                </div>
                <div className="fav-button">
                  {showFavourite ? (
                    <div className="add-to-fav" onClick={HandleClick}>
                      Unfollow
                    </div>
                  ) : (
                    <div className="add-to-fav" onClick={HandleClick}>
                      Follow
                    </div>
                  )}
                </div>
              </div>

              <NextWeek cityKey={props.cityKey}></NextWeek>
            </motion.div>
          ) : (
            <div className="data-loading">Loading Data</div>
          )}
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
