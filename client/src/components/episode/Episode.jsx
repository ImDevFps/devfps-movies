import React from "react";
import "./Episode.scss";
import { withRouter } from "react-router";
import { addFile } from "./../../redux/player/player.actions";
import { connect } from "react-redux";
import PlayCircleTwoToneIcon from "@mui/icons-material/PlayCircleTwoTone";

const Episode = ({ episode, addFile, history }) => {
  const handleClick = () => {
    addFile(episode);
    history.push(`/browse/player/${episode.title}`);
  };
  return (
    <div className='episode-container'>
      <div className='episode-play'>
        <div className='wrapper'>
          <img src={episode.poster} alt='item' />
        </div>
        <div onClick={handleClick}>
          <PlayCircleTwoToneIcon />
        </div>
      </div>
      <span>{episode.title}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addFile: (episode) => dispatch(addFile(episode)),
});

export default withRouter(connect(null, mapDispatchToProps)(Episode));
