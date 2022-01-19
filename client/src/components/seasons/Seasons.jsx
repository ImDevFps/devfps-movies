import React, { useEffect, useState } from "react";
import "./Seasons.scss";
import Episode from "./../episode/Episode";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";

const Seasons = ({ season, idx }) => {
  const [hide, setHide] = useState(true);
  useEffect(() => {
    if (idx === 1) {
      setHide(false);
    } else {
      setHide(true);
    }
  }, [idx]);

  const handleHidden = () => {
    setHide(!hide);
  };
  return (
    <div className='season-container'>
      <div className='season-title' onClick={handleHidden}>
        {hide ? (
          <ArrowDropDownOutlinedIcon fontSize='medium' />
        ) : (
          <ArrowLeftOutlinedIcon fontSize='medium' />
        )}

        <span>{season.title}</span>
      </div>
      {hide ? (
        ""
      ) : (
        <div className='episodes-container'>
          {season.episodes
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((epi) => (
              <Episode key={epi.id} episode={epi} i={idx} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Seasons;
