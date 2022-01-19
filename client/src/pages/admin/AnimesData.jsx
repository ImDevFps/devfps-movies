import React, { useState } from "react";
import { Route } from "react-router";
import { firestore } from "../../firebase/firebase.utils";
import AdminAnimeCard from "../../components/admin-anime-card/AdminAnimeCard";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AnimesData = ({ animes }) => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [img_src, setImgSrc] = useState("");
  const [trailer, setTrailer] = useState("");
  const [about, setAbout] = useState("");
  const [casts, setCasts] = useState("");
  const [country, setCountry] = useState("");
  const like = 0;
  const disLike = 0;
  const [explain, setExplain] = useState("");
  const [genre, setGenre] = useState("");
  const [routeName, setRouteName] = useState("");
  const [year, setYear] = useState(0);

  const [snack, setSnack] = useState(false);

  const createAnimes = () => {
    const db = firestore;
    db.collection("animes").add({
      title,
      poster,
      img_src,
      routeName,
      trailer,
      about,
      casts,
      country,
      like,
      disLike,
      explain,
      genre,
      year,
      seasons: [{ id: 1, title: "فصل اول", episodes: [] }],
    });
    setSnack(true);
  };

  return (
    <div className='container'>
      <div className='movie-list'>
        {animes.map((item) => (
          <AdminAnimeCard key={item.id} item={item} />
        ))}
      </div>

      <div className='create-movies'>
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
        <ul>
          <li>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='title'
            />
          </li>
          <li>
            <input
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              placeholder='poster'
            />
          </li>
          <li>
            <input
              value={img_src}
              onChange={(e) => setImgSrc(e.target.value)}
              placeholder='img_src'
            />
          </li>
          <li>
            <input
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder='routeName'
            />
          </li>
          <li>
            <input
              value={trailer}
              onChange={(e) => setTrailer(e.target.value)}
              placeholder='trailer'
            />
          </li>
          <li>
            <input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder='about'
            />
          </li>
          <li>
            <input
              value={casts}
              onChange={(e) => setCasts(e.target.value)}
              placeholder='casts'
            />
          </li>
          <li>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder='country'
            />
          </li>
          <li>
            <input
              value={explain}
              onChange={(e) => setExplain(e.target.value)}
              placeholder='explain'
            />
          </li>
          <li>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder='genre'
            />
          </li>
          <li>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder='year'
            />
          </li>
          <li>
            <button onClick={createAnimes}>Create</button>
          </li>
        </ul>
      </div>
      <Route path={`/admin/animes/:animelId`} />
    </div>
  );
};

export default AnimesData;
