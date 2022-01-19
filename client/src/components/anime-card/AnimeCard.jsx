import React from "react";
import { withRouter } from "react-router";

const AnimeCard = ({ anime, history }) => {
  return (
    <div className='movie-card'>
      <span onClick={() => history.push(`/browse/animes/${anime.routeName}`)}>
        <img src={anime.poster} alt='item' />
      </span>
    </div>
  );
};

export default withRouter(AnimeCard);
