import React, { useRef, useEffect } from "react";
import fluidPlayer from "fluid-player";
import { selectMovie } from "../../redux/movies/movies.selector";
import { connect } from "react-redux";
import "./Player.scss";
import { selectFile } from "../../redux/player/player.selectors";

const Player = ({ player }) => {
  const ref = useRef();

  useEffect(() => {
    fluidPlayer(ref.current, {
      layoutControls: {
        playPauseAnimation: true,
        autoPlay: true,
        preload: false,
        fillToContainer: true,
        posterImage: `${player.poster}`,
        title: `${player.title}`,
        subtitlesEnabled: true,
        controlBar: {
          autoHide: true, // Default false
          autoHideTimeout: 5, // Default 3
          animated: true, // Default true
        },
      },
    });
  }, [player]);

  return (
    <div className='player-container-main'>
      <video ref={ref} id='my-video'>
        <source
          src={player.src_1}
          data-fluid-hd
          title='720p'
          type='video/mp4'
        />
        {player.src_2 !== "" ? (
          <source
            src={player.src_2}
            data-fluid-hd
            title='1080p'
            type='video/mp4'
          />
        ) : (
          ""
        )}
        {player.subtitle && (
          <track
            label='persian'
            kind='metadata'
            srcLang='per'
            src={player.subtitle}
            default></track>
        )}
      </video>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  movie: selectMovie(ownProps.match.params.movieId)(state),
  player: selectFile(state),
});

export default connect(mapStateToProps)(Player);
