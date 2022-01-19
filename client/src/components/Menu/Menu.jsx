import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import MovieCard from "./../../components/movie-card/MovieCard";
import "./Menu.scss";
import SerialCard from "../serial-card/SerialCard";
import AnimeCard from "../anime-card/AnimeCard";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectSerialsForPreview,
  selectMoviesForPreview,
  selectAnimesForPreview,
} from "../../redux/movies/movies.selector";

const Menu = ({ movies, serials, animes }) => {
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

  //generating randow number between movies.length && serials.length for trailer preview
  const traNum = Math.floor(Math.random() * movies.length) + 0;
  const serNum = Math.floor(Math.random() * serials.length) + 0;
  //generating random number between serials and movies 2obj
  const genreNum = Math.floor(Math.random() * 2) + 0;

  useEffect(() => {
    var video = document.getElementById("my-video");
    video.addEventListener("canplay", function () {
      setTimeout(function () {
        video.play();
      }, 2000);
    });
  }, []);
  return (
    <div>
      <div className='player-container'>
        <video
          muted='muted'
          preload='auto'
          className='banner-video'
          poster={
            genreNum === 0 ? movies[traNum].poster : serials[serNum].poster
          }
          id='my-video'>
          <source
            src={
              genreNum === 0 ? movies[traNum].trailer : serials[serNum].trailer
            }
            type='video/mp4'
          />
        </video>
        <img
          className='responsive-poster'
          src={genreNum === 0 ? movies[traNum].poster : serials[serNum].poster}
          alt='poster'
        />
      </div>

      <div className='movie-cards'>
        <div className='title-container'>
          <span className='title'>تازه ترین فیلم ها</span>
        </div>
        <OwlCarousel slideBy={3} rewind margin={10} nav responsive={responsive}>
          {movies.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </OwlCarousel>
      </div>

      <div className='movie-cards-1'>
        <div className='title-container'>
          <span className='title'>جدیدترین سریال ها</span>
        </div>
        <OwlCarousel slideBy={3} rewind margin={10} nav responsive={responsive}>
          {serials.map((item) => (
            <SerialCard key={item.id} serial={item} />
          ))}
        </OwlCarousel>
      </div>

      <div className='movie-cards-1'>
        <div className='title-container'>
          <span className='title'>برترین انیمه ها</span>
        </div>
        <OwlCarousel slideBy={3} rewind margin={10} nav responsive={responsive}>
          {animes.map((item) => (
            <AnimeCard key={item.id} anime={item} />
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  movies: selectMoviesForPreview,
  serials: selectSerialsForPreview,
  animes: selectAnimesForPreview,
});

export default connect(mapStateToProps)(Menu);
