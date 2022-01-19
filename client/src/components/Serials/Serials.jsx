import React, { useEffect } from "react";
import SerialCard from "../serial-card/SerialCard";
import OwlCarousel from "react-owl-carousel";
import { createStructuredSelector } from "reselect";
import { selectSerialsForPreview } from "./../../redux/movies/movies.selector";
import { connect } from "react-redux";

const Serials = ({ serials }) => {
  //generating randow number between movies.length for trailer preview
  const traNum = Math.floor(Math.random() * serials.length) + 0;

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
          poster={serials[traNum].poster}
          id='my-video'>
          <source src={serials[traNum].trailer} type='video/mp4' />
        </video>
      </div>

      <div className='movie-cards'>
        <div className='title-container'>
          <span className='title'>تازه ترین ها</span>
        </div>
        <OwlCarousel slideBy={3} rewind margin={10} nav responsive={responsive}>
          {serials.map((item) => (
            <SerialCard key={item.id} serial={item} />
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  serials: selectSerialsForPreview,
});

export default connect(mapStateToProps)(Serials);
