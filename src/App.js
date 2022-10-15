import React from "react";
import "./sass/styles.scss";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import Favourites from "./containers/Favourites";

const App = () => {
  const location = useLocation();

  var appHeight = function appHeight() {
    var doc = document.documentElement;
    doc.style.setProperty("--app-height", "".concat(window.innerHeight, "px"));
  };

  appHeight();

  window.addEventListener("resize", appHeight);

  return (
    <div className="App">
      <div className="main-app">
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route exact path="/city/:cityKey" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="favourites" element={<Favourites />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
