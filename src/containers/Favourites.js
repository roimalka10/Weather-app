import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/favourites";
import axios from "axios";
import { Link } from "react-router-dom";

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  const isMetric = useSelector((state) => state.isMetric);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const [localFav, setLocalFav] = useState([]);

  const handleRemove = (Key, e) => {
    e.preventDefault();
    dispatch(remove(Key));
  };

  useEffect(() => {
    getWeather();
  }, [favourites]);

  async function getWeather() {
    try {
      const promises = favourites.map((fav) => {
        return axios.get(
          `https://dataservice.accuweather.com/currentconditions/v1/${fav.Key}?apikey=z8L1GEx871whuVrAK9FCvPIq0szzdUlW`
        );
      });

      const tempFavourites = await Promise.all(promises).then((values) => {
        const favWeatherResponse = [];
        for (let i = 0; i < values.length; i++) {
          const weather = values[i].data[0];
          favWeatherResponse.push({
            key: favourites[i].Key,
            name: favourites[i].Name,
            weatherText: weather.WeatherText,
            temperature: weather.Temperature,
          });
        }
        return favWeatherResponse;
      });

      setLocalFav(tempFavourites);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  return (
    <>
      {isError ? (
        <div className="error">
          An error has occured, please come back later
        </div>
      ) : (
        <div className="favouriteHome">
          {localFav.length > 0 ? (
            localFav.map((fav) => {
              return (
                <Link to={`/city/${fav.key}`}>
                  <div className="favouriteDetails">
                    <div className="favourite">
                      <div>{fav.name}</div>
                      {isMetric.value
                        ? fav.temperature.Metric.Value +
                          "°" +
                          fav.temperature.Metric.Unit
                        : fav.temperature.Imperial.Value +
                          "°" +
                          fav.temperature.Imperial.Unit}
                      <div>{fav.weatherText}</div>
                    </div>
                  </div>
                  <div
                    className="add-to-fav"
                    onClick={(e) => handleRemove(fav.key, e)}
                  >
                    Unfollow
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="noFavourite">No Favourites Yet</div>
          )}
        </div>
      )}
    </>
  );
};

export default Favourites;
