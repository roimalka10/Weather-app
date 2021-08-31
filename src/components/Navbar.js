import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";
import { BsArrowRightShort } from "react-icons/bs";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../store/isMetric";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const isMetric = useSelector((state) => state.isMetric);
  const [degree, setDegree] = useState(isMetric);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <motion.div
        className="navbar"
        initial={{ y: "-10vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "tween" }}
      >
        <a className="appName" href="/">
          Herolo Weather App
        </a>
        <div
          className="changeUnits2"
          onClick={() => {
            dispatch(change());
            setDegree((prevState) => !prevState);
          }}
        >
          {degree ? <WiCelsius /> : <WiFahrenheit />}
        </div>
        <div className={showMenu ? "navbar-items active" : "navbar-items"}>
          <span className="changeText">change units</span>
          <BsArrowRightShort className="arrow" />
          <div
            className="changeUnits"
            onClick={() => {
              dispatch(change());
              setDegree((prevState) => !prevState);
            }}
          >
            {degree ? <WiCelsius /> : <WiFahrenheit />}
          </div>
          <NavLink onClick={handleClick} to="/">
            <span>Home</span>
          </NavLink>
          <NavLink
            onClick={handleClick}
            activeClassName="activated"
            to="/favourites"
          >
            <span>Favourites</span>
          </NavLink>
        </div>
        <div className="burger-icon" onClick={handleClick}>
          {showMenu ? <FaTimes size={32} /> : <FaBars size={28} />}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
