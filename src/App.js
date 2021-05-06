import "./App.css";
import Login from "./Component/Login";
import "./Component/Style.css";
import Register from "./Component/Register";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Component/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          {localStorage.getItem("show") === "false" ? (
            <Redirect to="/" />
          ) : (
            <Route exact path="/home" component={Home} />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
