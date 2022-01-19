import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.scss";
import Header from "./components/header/Header";
import HomePage from "./pages/homepage/HomePage";
import Movies from "./pages/movies/Movies";
import Serials from "./components/Serials/Serials";
import Films from "./components/Films/Films";
import WithSpinner from "./components/with-spinner/WithSpinner";
import { connect } from "react-redux";

import { fetchDataStartAsync } from "./redux/movies/movies.action";
import Admin from "./pages/admin/Admin";
import { selecCurrentUser } from "./redux/user/user.selector";
import { setCurrentUser } from "./redux/user/user.actions";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import Animes from "./components/Animes/Animes";
import {
  selectIsMoviesFetching,
  selectIsSerialsFerching,
  selectIsAnimesFetching,
} from "./redux/movies/movies.selector";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AnimesWithSpinner = WithSpinner(Animes);
const SerialsWithSpinner = WithSpinner(Serials);
const FilmsWithSpinner = WithSpinner(Films);

const App = ({
  fetchDataStartAsync,
  isMoviesFetching,
  isSerialsFetching,
  isAnimesFetching,
  setCurrentUser,
  currentUser,
}) => {
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    fetchDataStartAsync();
  }, [fetchDataStartAsync]);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
      setTimeout(() => [auth.signOut(), setSnack(true)], 1000 * 60 * 60 * 3);
    });
    return unsubscribeFromAuth;
  }, [setCurrentUser]);

  // useEffect(() => {
  //   setTimeout(() => [console.log("hi"), console.log("bye")], 3000);
  // }, []);

  const url = window.location.pathname;
  return (
    <div className='App'>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snack}
          autoHideDuration={6000}
          onClose={() => setSnack(false)}>
          <Alert
            onClose={() => setSnack(false)}
            severity='info'
            sx={{ width: "100%" }}>
            You'r log in session expired please sign in again!
          </Alert>
        </Snackbar>
      </Stack>
      {url.includes("/browse/player/") ? "" : <Header />}
      <Switch>
        <Route
          exact
          path='/films'
          render={() =>
            currentUser && currentUser.active === "yes" ? (
              <FilmsWithSpinner isLoading={isMoviesFetching} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          exact
          path='/serials'
          render={() =>
            currentUser && currentUser.active === "yes" ? (
              <SerialsWithSpinner isLoading={isSerialsFetching} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          exact
          path='/animes'
          render={() =>
            currentUser && currentUser.active === "yes" ? (
              <AnimesWithSpinner isLoading={isAnimesFetching} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path='/browse'
          render={() =>
            currentUser && currentUser.active === "yes" ? (
              <Movies loading={isMoviesFetching} />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path='/admin'
          render={() =>
            currentUser && currentUser.active === "yes" ? (
              <Admin />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          exact
          path='/'
          render={() =>
            currentUser && currentUser.active === "yes" ? (
              <Redirect to='/browse' />
            ) : (
              <HomePage />
            )
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isMoviesFetching: selectIsMoviesFetching,
  isSerialsFetching: selectIsSerialsFerching,
  isAnimesFetching: selectIsAnimesFetching,
  currentUser: selecCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDataStartAsync: () => dispatch(fetchDataStartAsync()),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
