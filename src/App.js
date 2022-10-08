import "./sass/styles.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import Favourites from "./containers/Favourites";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/city/:cityKey">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/favourites">
            <Favourites />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
