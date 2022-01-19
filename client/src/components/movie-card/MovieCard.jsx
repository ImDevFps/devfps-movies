import React from "react";
import { withRouter } from "react-router";
import "./MovieCard.scss";
import { addFile } from "./../../redux/player/player.actions";
import { connect } from "react-redux";

const MovieCard = ({ movie, history, addFile }) => {
  const handleClick = () => {
    addFile(movie);
    history.push(`/browse/player/${movie.routeName}`);
  };
  return (
    <div className='movie-card' onClick={handleClick}>
      <img src={movie.poster} alt='item' />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addFile: (movie) => dispatch(addFile(movie)),
});

export default withRouter(connect(null, mapDispatchToProps)(MovieCard));
