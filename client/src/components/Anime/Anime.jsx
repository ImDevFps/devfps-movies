import React from "react";
import { connect } from "react-redux";
import Seasons from "./../seasons/Seasons";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import TheatersIcon from "@mui/icons-material/Theaters";
import { selectAnime } from "./../../redux/movies/movies.selector";

const Anime = ({ anime }) => {
  const {
    title,
    genre,
    year,
    country,
    img_src,
    trailer,
    casts,
    like,
    disLike,
    explain,
    about,
  } = anime;
  return (
    <div className='serial-container'>
      <div className='responsive-container'>
        <img className='blured-background' src={img_src} alt='' />
        <div className='serial-preview-container'>
          <div className='details-container'>
            <div>
              <p>{title}</p>
              <div className='deep-look'>
                <span>{genre}</span>
                <span>{year}</span>
                <span>{country}</span>
              </div>
            </div>
            <div className='casts'>
              <span>{casts}</span>:<span>بازیگران</span>
            </div>
            <div className='like-container'>
              <span className='like-button liked-first'>
                <ThumbDownAltIcon />
                {disLike}
              </span>
              <span className='like-button liked-second'>
                <ThumbUpIcon />
                {like}
              </span>
            </div>
          </div>
          <div className='img-container'>
            <img src={img_src} alt='' />
          </div>
        </div>
      </div>

      <div className='serial-trailer-player'>
        <video
          controls
          preload='auto'
          className='serial-trailer'
          poster={anime.poster}
          id='my-video'>
          <source src={trailer} type='video/mp4' />
        </video>
      </div>

      <div className='explain'>
        <span>داستان سریال</span>
        <TheatersIcon />
        <p>{explain}</p>
      </div>
      <div className='about'>
        <span>درباره سریال</span>
        <TheatersIcon />
        <p>{about}</p>
      </div>

      <div className='seasons'>
        {anime.seasons.map((item, idx) => (
          <Seasons key={item.id} season={item} idx={idx + 1} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  anime: selectAnime(ownProps.match.params.animeId)(state),
});

export default connect(mapStateToProps)(Anime);
