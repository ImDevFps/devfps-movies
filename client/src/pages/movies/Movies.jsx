import React from "react";
import { Route } from "react-router";
import Player from "../../components/player/Player";
import "./Movies.styles.scss";
import Menu from "./../../components/Menu/Menu";
import Serial from "../../components/Serial/Serial";
import WithSpinner from "../../components/with-spinner/WithSpinner";
import Anime from "../../components/Anime/Anime";

const MenuWithSpinner = WithSpinner(Menu);

const Movies = ({ loading }) => {
  return (
    <div className='movies-page'>
      <Route
        exact
        path={`/browse`}
        render={() => <MenuWithSpinner isLoading={loading} />}
      />
      <Route exact path={`/browse/player/:movieId`} component={Player} />
      <Route path={`/browse/serials/:serialId`} component={Serial} />
      <Route path={`/browse/animes/:animeId`} component={Anime} />
    </div>
  );
};

export default Movies;
