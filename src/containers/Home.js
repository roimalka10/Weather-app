import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CurrentWeather from "../components/CurrentWeather";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import AnimateHome from "../components/AnimateHome";

const axios = require("axios");

const Home = () => {
  const { cityKey } = useParams();
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("tel aviv");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (input != null) {
      axios
        .get(
          `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=z8L1GEx871whuVrAK9FCvPIq0szzdUlW&q=${input}`
        )
        .then(function (response) {
          setCities(response.data);
          setIsError(false);
        })
        .catch(function (error) {
          setIsError(true);
        });
    }
  }, [input]);

  useEffect(() => {
    if (cityKey != null) {
      axios
        .get(
          `https://dataservice.accuweather.com/locations/v1/${cityKey}?apikey=z8L1GEx871whuVrAK9FCvPIq0szzdUlW&details=true`
        )
        .then(function (response) {
          setSelectedCity(response.data);
          setIsError(false);
        })
        .catch(function (error) {
          setIsError(true);
        });
    }
  }, [cityKey]);

  return (
    <AnimateHome>
      {isError ? (
        <div className="error">
          An error has occured, please come back later
        </div>
      ) : (
        <motion.div className="home">
          <div className="searchArea">
            <div className="searchInfo">
              <input
                type="text"
                required
                placeholder="Search"
                id="inputSearch"
              />
              <div
                className="searchIcon"
                onClick={(e) => {
                  setSelectedCity(null);
                  setInput(document.getElementById("inputSearch").value);
                }}
              >
                <AiOutlineSearch size={28} />
              </div>
            </div>
          </div>
          <div className="forecastDetails">
            {selectedCity ? (
              <CurrentWeather
                cityName={selectedCity.LocalizedName}
                countryName={selectedCity.Country.ID}
                cityKey={selectedCity.Key}
              />
            ) : cities.length > 0 ? (
              cities.slice(0, 1).map((city) => {
                return (
                  <CurrentWeather
                    cityName={city.LocalizedName}
                    countryName={city.Country.ID}
                    cityKey={city.Key}
                  />
                );
              })
            ) : (
              <div>Search for a city!</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimateHome>
  );
};

export default Home;
