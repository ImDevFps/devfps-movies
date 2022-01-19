import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import MovieCard from "../movie-card/MovieCard";
import { createStructuredSelector } from "reselect";
import { selectMoviesForPreview } from "../../redux/movies/movies.selector";
import { connect } from "react-redux";
const Films = ({ movies }) => {
  //generating randow number between movies.length for trailer preview
  const traNum = Math.floor(Math.random() * movies.length) + 0;

  const responsive = {
    0: {
      items: 2,
    },
    576: {
      items: 4,
    },
    900: {
      items: 5,
    },
    1200: {
      items: 6,
    },
  };

  useEffect(() => {
    var video = document.getElementById("my-video");
    video.addEventListener("canplay", function () {
      setTimeout(function () {
        video.play();
      }, 2000);
    });
  }, []);

  return (
    <div className='genre-container'>
      <div className='player-container'>
        <video
          muted='muted'
          preload='auto'
          className='banner-video'
          poster={movies[traNum].poster}
          id='my-video'>
          <source src={movies[traNum].trailer} type='video/mp4' />
        </video>
      </div>

      <div className='movie-cards'>
        <div className='title-container'>
          <span className='title'>تازه ترین ها</span>
        </div>
        <OwlCarousel slideBy={3} rewind margin={10} nav responsive={responsive}>
          {movies.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  movies: selectMoviesForPreview,
});

export default connect(mapStateToProps)(Films);
