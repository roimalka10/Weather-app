import React, { useState, useEffect } from "react";
import "./sass/styles.scss";
import "./sass/components/loader.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import gif from "./assets/barometer.gif";
import AnimatedRoutes from "./components/AnimatedRoutes";
const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  var appHeight = function appHeight() {
    var doc = document.documentElement;
    doc.style.setProperty("--app-height", "".concat(window.innerHeight, "px"));
  };

  appHeight();

  window.addEventListener("resize", appHeight);

  return (
    <div className="App">
      <Router>
        {loading ? (
          <div className="loader">
            <div className="loader-logo">
              <img src={gif} />
            </div>
            <div className="loader-text">Loading Site</div>
          </div>
        ) : (
          <div className="main-app">
            <Navbar />
            <AnimatedRoutes />
          </div>
        )}
      </Router>
    </div>
  );
};

export default App;
