import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import Auth from "../Pages/LoginPage/LoginPage";
let ProtectedRoute = ({ children, ...res }) => {
  const { user } = useSelector((state) => state.userAuth);

  return (
    <Route
      {...res}
      render={() => {
        return !user ? <Redirect to="/login" /> : children;
      }}
    ></Route>
  );
};
let LoginRoute = ({ children, ...res }) => {
  const { user } = useSelector((state) => state.userAuth);

  return (
    <Route
      {...res}
      render={() => {
        return user ? <Redirect to="/" /> : children;
      }}
    ></Route>
  );
};
function Routes() {
  return (
    <>
      <Switch>
        <ProtectedRoute exact={true} path="/">
          <Home />
        </ProtectedRoute>
        <LoginRoute exact={true} path="/login">
          <Auth />
        </LoginRoute>
      </Switch>
    </>
  );
}

export default Routes;
