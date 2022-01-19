import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";
import { selectSerial } from "./../../redux/movies/movies.selector";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AdminSerialEdit = ({ serial }) => {
  const [title, setTitle] = useState(serial.title);
  const [poster, setPoster] = useState(serial.poster);
  const [img_src, setImgSrc] = useState(serial.img_src);
  const [trailer, setTrailer] = useState(serial.trailer);
  const [about, setAbout] = useState(serial.about);
  const [casts, setCasts] = useState(serial.casts);
  const [country, setCountry] = useState(serial.country);
  const [explain, setExplain] = useState(serial.explain);
  const [genre, setGenre] = useState(serial.genre);
  const [year, setYear] = useState(serial.year);
  const [idx, setIdx] = useState(serial.seasons.length + 1);
  const [Stitle, setStitle] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [season, setSeason] = useState({
    id: idx,
    title: Stitle,
    episodes: episodes,
  });
  const [seasons, setSeasons] = useState([...serial.seasons]);
  const [Eidx, setEidx] = useState("");
  const [Etitle, setEtitle] = useState("");
  const [Eposter, setEposter] = useState("");
  const [src_1, setSrc1] = useState("");
  const [src_2, setSrc2] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [episode, setEpisode] = useState({
    id: Eidx,
    title: Etitle,
    poster: Eposter,
    src_1,
    src_2,
    subtitle,
  });

  const [Ridx, setRidx] = useState("");
  const [Repisodes, setRepisodes] = useState(
    Ridx !== "" ? [...seasons[Ridx]["episodes"]] : ""
  );

  //success alert
  const [snack, setSnack] = useState(false);
  //disbale handlers
  const [dis1, setDis1] = useState(true);
  const [dis2, setDis2] = useState(true);
  const [dis3, setDis3] = useState(true);
  const [dis4, setDis4] = useState(true);

  useEffect(() => {
    setRepisodes(Ridx && [...seasons[Ridx]["episodes"]]);
    if (Ridx === "") {
      setEidx(1);
    } else {
      setEidx(seasons[Ridx].episodes.length + 1);
    }
  }, [Ridx, seasons]);

  useEffect(() => {
    if (Etitle !== "") {
      setDis1(false);
    } else {
      setDis1(true);
    }
  }, [Etitle]);

  useEffect(() => {
    if (season.episodes.length === 0) {
      setDis4(true);
    } else {
      setDis4(false);
    }
  }, [season]);

  const updateHandler = async () => {
    const db = firestore;
    await db
      .collection("serials")
      .doc(serial.id)
      .set({
        ...serial,
        title,
        poster,
        img_src,
        about,
        casts,
        trailer,
        country,
        explain,
        genre,
        year,
        seasons,
      });
    setSnack(true);
  };
  const deleteHandler = () => {
    const db = firestore;
    db.collection("serials").doc(serial.id).delete();
    setSnack(true);
  };

  const seasonAddHandler = () => {
    setSeasons((item) => [...item, season]);
    setSeason("");
    setDis2(true);
    setDis3(false);
  };

  const episodeAddHandler = () => {
    setEpisodes((item) => [...item, episode]);
    setEpisode("");
    setDis2(true);
    setDis3(false);
  };

  const updateRestEpisodes = () => {
    setRepisodes((item) => [...item, episode]);
    setEpisode("");
    setDis2(true);
    setDis3(false);
  };

  const updateRestSeasons = () => {
    const newSeasons = [...seasons];

    const updatedEpisodes = { ...newSeasons[Ridx] };

    updatedEpisodes.episodes = Repisodes;

    newSeasons[Ridx] = updatedEpisodes;

    setSeasons(newSeasons);

    setDis3(true);
  };
  // console.log(Ridx);
  // console.log("Repisodes:", Repisodes);
  // console.log("episode:", episode);
  // console.log("episodes:", episodes);
  // console.log("season:", season);
  // console.log("seasons:", seasons);

  return (
    <div className='container'>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={snack}
          autoHideDuration={6000}
          onClose={() => setSnack(false)}>
          <Alert
            onClose={() => setSnack(false)}
            severity='success'
            sx={{ width: "100%" }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </Stack>
      <div className='edit-list'>
        <ul>
          <li>
            <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>serial title</span>
          </li>
          <li>
            <input
              type='text'
              name='about'
              value={about}
              placeholder='about'
              onChange={(e) => setAbout(e.target.value)}
            />
            <span>about serial</span>
          </li>
          <li>
            <input
              type='text'
              name='poster'
              value={poster}
              placeholder='poster'
              onChange={(e) => setPoster(e.target.value)}
            />
            <span>poster url</span>
          </li>
          <li>
            <input
              type='text'
              name='img_src'
              value={img_src}
              placeholder='img_src'
              onChange={(e) => setImgSrc(e.target.value)}
            />
            <span>image url</span>
          </li>
          <li>
            <input
              type='text'
              name='trailer'
              value={trailer}
              placeholder='trailer'
              onChange={(e) => setTrailer(e.target.value)}
            />
            <span>trailer video url</span>
          </li>
          <li>
            <input
              type='text'
              name='casts'
              placeholder='casts'
              value={casts}
              onChange={(e) => setCasts(e.target.value)}
            />
            <span>serial casts</span>
          </li>
          <li>
            <input
              type='text'
              name='country'
              value={country}
              placeholder='country'
              onChange={(e) => setCountry(e.target.value)}
            />
            <span>serial country</span>
          </li>
          <li>
            <input
              type='text'
              name='explain'
              value={explain}
              placeholder='explain'
              onChange={(e) => setExplain(e.target.value)}
            />
            <span>explain serial</span>
          </li>
          <li>
            <input
              type='text'
              name='genre'
              placeholder='genre'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <span>serial genre</span>
          </li>
          <li>
            <input
              type='text'
              name='year'
              placeholder='year'
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <span>serial production year</span>
          </li>
          <li>
            <select onChange={(e) => setRidx(e.target.value)}>
              <option value=''>select</option>
              {serial.seasons.map((ele, idx) => (
                <option key={ele.id} value={idx}>
                  {ele.title}
                </option>
              ))}
            </select>
            <span>adding new episode to existing season</span>
          </li>
          <li>
            <input
              type='number'
              name='Eidx'
              placeholder='episode id'
              value={Eidx}
              onChange={(e) => setEidx(e.target.value)}
            />
            <span>episode idx</span>
          </li>
          <li>
            <input
              type='text'
              name='Etitle'
              placeholder='episode title'
              value={Etitle}
              onChange={(e) => setEtitle(e.target.value)}
            />
            <span>episode title</span>
          </li>
          <li>
            <input
              type='text'
              name='Eposter'
              placeholder='episode poster'
              value={Eposter}
              onChange={(e) => setEposter(e.target.value)}
            />
            <span>episode poster</span>
          </li>
          <li>
            <input
              type='text'
              name='src_1'
              placeholder='src_1'
              value={src_1}
              onChange={(e) => setSrc1(e.target.value)}
            />
            <span>720P source</span>
          </li>
          <li>
            <input
              type='text'
              name='src_2'
              placeholder='src_2'
              value={src_2}
              onChange={(e) => setSrc2(e.target.value)}
            />
            <span>1080P source</span>
          </li>
          <li>
            <input
              type='text'
              name='subtitle'
              placeholder='subtitle'
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <span>subtitle</span>
          </li>
          <li>
            <input
              type='number'
              name='idx'
              placeholder='idx'
              value={idx}
              onChange={(e) => setIdx(e.target.value)}
            />
            <span>new season id</span>
          </li>
          <li className='last-list'>
            <input
              type='text'
              name='Stitle'
              placeholder='season title'
              value={Stitle}
              onChange={(e) => setStitle(e.target.value)}
            />
            <span>new season title</span>
          </li>
          <li>
            <div className='existing-lists'>
              {Repisodes &&
                Repisodes.sort((a, b) => (a.id > b.id ? 1 : -1)).map((item) => (
                  <div key={item.id}>{item.title}</div>
                ))}
            </div>
            <div className='existing-lists'>
              {seasons
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((item) => (
                  <div key={item.id}>{item.title}</div>
                ))}
            </div>
          </li>
        </ul>
        <div className='handler-buttons'>
          <button
            onClick={() => [
              setEpisode({
                id: Eidx,
                title: Etitle,
                poster: Eposter,
                src_1,
                src_2,
                subtitle,
              }),
              setEidx(""),
              setEtitle(""),
              setEposter(""),
              setSrc1(""),
              setSrc2(""),
              setSubtitle(""),
              setDis1(true),
              setDis2(false),
            ]}
            disabled={dis1}>
            1-1 create episode object 2-1
          </button>
          <button
            onClick={() => [
              setSeason({
                id: idx,
                title: Stitle,
                episodes: episodes,
              }),
              setIdx(""),
              setStitle(""),
              setDis3(true),
            ]}
            disabled={dis3}>
            2-3 create season object
          </button>
        </div>
        <div className='handler-buttons'>
          <button onClick={updateRestEpisodes} disabled={dis2}>
            1-2 adding episode obj to existing episodes
          </button>
          <button onClick={updateRestSeasons} disabled={dis3}>
            1-3 adding new episodes to existing season
          </button>
        </div>
        <div className='handler-buttons'>
          <button onClick={episodeAddHandler} disabled={dis2}>
            2-2 adding episode obj to episodes list
          </button>
          <button onClick={seasonAddHandler} disabled={dis4}>
            2-4 adding season obj to season list
          </button>
        </div>
        <div className='handler-buttons'>
          <button onClick={updateHandler}>Update</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  serial: selectSerial(ownProps.match.params.serialId)(state),
});

export default connect(mapStateToProps)(AdminSerialEdit);
