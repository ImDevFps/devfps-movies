import React, { useState } from "react";
import AdminMovieCard from "../../components/admin-movie-card/AdminMovieCard";
import { Route } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import "./admin.scss";

const MoviesData = ({ movies }) => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [trailer, setTrailer] = useState("");
  const [routeName, setRouteName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [src_1, setSrc1] = useState("");
  const [src_2, setSrc2] = useState("");

  const createMovie = () => {
    const db = firestore;
    db.collection("movies").add({
      title,
      poster,
      routeName,
      trailer,
      subtitle,
      src_1,
      src_2,
    });
  };

  return (
    <div className='container'>
      <div className='movie-list'>
        {movies.map((item) => (
          <AdminMovieCard key={item.id} item={item} />
        ))}
      </div>
      <div className='create-movies'>
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
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              placeholder='routeName'
            />
          </li>
          <li>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder='subtitle'
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
              value={src_1}
              onChange={(e) => setSrc1(e.target.value)}
              placeholder='src1'
            />
          </li>
          <li>
            <input
              value={src_2}
              onChange={(e) => setSrc2(e.target.value)}
              placeholder='src2'
            />
          </li>
          <li>
            <button onClick={createMovie}>Create</button>
          </li>
        </ul>
      </div>
      <Route path={`/admin/movies/:movieId`} />
    </div>
  );
};

export default MoviesData;
