import React, { useEffect } from "react";
import AnimeCard from "../anime-card/AnimeCard";
import OwlCarousel from "react-owl-carousel";
import { createStructuredSelector } from "reselect";
import { selectAnimesForPreview } from "./../../redux/movies/movies.selector";
import { connect } from "react-redux";

const Animes = ({ animes }) => {
  const traNum = Math.floor(Math.random() * animes.length) + 0;

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
          poster={animes[traNum].poster}
          id='my-video'>
          <source src={animes[traNum].trailer} type='video/mp4' />
        </video>
      </div>

      <div className='movie-cards'>
        <div className='title-container'>
          <span className='title'>تازه ترین ها</span>
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
  animes: selectAnimesForPreview,
});

export default connect(mapStateToProps)(Animes);
