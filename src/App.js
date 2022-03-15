import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Setup from "./components/Setup";
import Report from "./components/Report";
import Settings from "./components/Settings";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Setup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/setting" component={Settings} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/report/:regno" component={Report} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
