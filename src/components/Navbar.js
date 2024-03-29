import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
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
        <div className="navbar-inner">
          <div className="appName">
            <a href="/">Weather App</a>
          </div>
          <div
            className="changeUnits2"
            onClick={() => {
              dispatch(change());
              setDegree((prevState) => !prevState);
            }}
          >
            {degree ? (
              <RiCelsiusFill size={30} />
            ) : (
              <RiFahrenheitFill size={30} />
            )}
          </div>
          <div className={showMenu ? "navbar-items active" : "navbar-items"}>
            <div
              className="changeUnits"
              onClick={() => {
                dispatch(change());
                setDegree((prevState) => !prevState);
              }}
            >
              {degree ? (
                <RiCelsiusFill size={30} />
              ) : (
                <RiFahrenheitFill size={30} />
              )}
            </div>
            <Link onClick={handleClick} to="/">
              <span>Home</span>
            </Link>
            <Link
              onClick={handleClick}
              activeClassName="activated"
              to="/favourites"
            >
              <span>Favourites</span>
            </Link>
          </div>
          <div className="burger-icon" onClick={handleClick}>
            {showMenu ? <FaTimes size={30} /> : <FaBars size={30} />}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
