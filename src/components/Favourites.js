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
    const tempFavourites = [];
    try {
      for (let i = 0; i < favourites.length; i++) {
        const response = await axios.get(
          `https://dataservice.accuweather.com/currentconditions/v1/${favourites[i].Key}?apikey=z8L1GEx871whuVrAK9FCvPIq0szzdUlW`
        );
        const weather = response.data[0];
        const currentCityWeather = {
          key: favourites[i].Key,
          name: favourites[i].Name,
          weatherText: weather.WeatherText,
          temperature: weather.Temperature,
        };
        tempFavourites.push(currentCityWeather);
      }
      setLocalFav(tempFavourites);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  }

  return (
    <>
      {isError ? (
        <div className="error">An error has occured, please refresh</div>
      ) : (
        <div className="favouriteHome">
          {localFav.length > 0 ? (
            localFav.map((fav) => {
              return (
                <Link to={`/city/${fav.key}`}>
                  <div className="favouriteDetails">
                    <div className="favouriteIcon">
                      <AiFillStar
                        size={44}
                        onClick={(e) => handleRemove(fav.key, e)}
                      />
                    </div>
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
