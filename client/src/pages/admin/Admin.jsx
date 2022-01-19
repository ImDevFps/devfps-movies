import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import app from "../../firebase/firebase.utils";
import MoviesData from "./MoviesData";
import AdminMovieEdit from "./../../components/admin-movie-edit/AdminMovieEdit";
import AdminSerialEdit from "../../components/admin-serial-edit/AdminSerialEdit";
import AdminAnimeEdit from "../../components/admin-anime-edit/AdminAnimeEdit";
import AdminData from "./../../components/admin-data/AdminData";
import SerialsData from "./SerialsData.jsx";
import AnimesData from "./AnimesData";

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [serials, setSerials] = useState([]);
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const fecthData = async () => {
      const db = getFirestore(app);
      const MovieData = collection(db, "movies");
      const SerialData = collection(db, "serials");
      const AnimeData = collection(db, "animes");
      const MovieSnapshot = await getDocs(MovieData);
      const SerialSnapshot = await getDocs(SerialData);
      const AnimeSnapshot = await getDocs(AnimeData);
      setMovies(
        MovieSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setSerials(
        SerialSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setAnimes(
        AnimeSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fecthData();
  }, []);
  return (
    <>
      <Route exact path='/admin' component={AdminData} />
      <Route
        exact
        path='/admin/movies'
        render={() => <MoviesData movies={movies} />}
      />
      <Route
        exact
        path='/admin/serials'
        render={() => <SerialsData serials={serials} />}
      />
      <Route
        exact
        path='/admin/animes'
        render={() => <AnimesData animes={animes} />}
      />

      <Route path={`/admin/movies/:movieId`} component={AdminMovieEdit} />
      <Route path={`/admin/serials/:serialId`} component={AdminSerialEdit} />
      <Route path={`/admin/animes/:animeId`} component={AdminAnimeEdit} />
    </>
  );
};

export default Admin;
