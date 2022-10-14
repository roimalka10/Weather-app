import React from "react";
import Home from "../containers/Home";
import Favourites from "../containers/Favourites";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch>
        <motion.div
          location={location}
          key={location.pathname}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.75,
            delay: 0.7,
          }}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            },
            animateState: {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            },
            exitState: {
              clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            },
          }}
        >
          <Route exact path="/city/:cityKey">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/favourites">
            <Favourites />
          </Route>
        </motion.div>
      </Switch>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
