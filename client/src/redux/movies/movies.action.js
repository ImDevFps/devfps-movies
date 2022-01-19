import MoviesActionTypes from "./movies.types";

import app, {
  convertSerialsSnapshotToMap,
  convertMoviesSnapshotToMap,
} from "../../firebase/firebase.utils";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// export const updateMovies = (moviesMap) => ({
//   type: MoviesActionTypes.UPDATE_MOVIES,
//   payload: moviesMap,
// });

export const fetchMoviesStart = () => ({
  type: MoviesActionTypes.FETCH_MOVIES_START,
});

export const fetchMoviesSuccess = (moviesMap) => ({
  type: MoviesActionTypes.FETCH_MOVIES_SUCCESS,
  payload: moviesMap,
});

export const fetchMoviesFailure = (errorMessage) => ({
  type: MoviesActionTypes.FETCH_MOVIES_FAILURE,
  payload: errorMessage,
});

export const fetchSerialsStart = () => ({
  type: MoviesActionTypes.FETCH_SERIALS_START,
});

export const fetchSerialsSuccess = (serialsMap) => ({
  type: MoviesActionTypes.FETCH_SERIALS_SUCCESS,
  payload: serialsMap,
});

export const fetchSerialsFailure = (errorMessage) => ({
  type: MoviesActionTypes.FETCH_SERIALS_FAILURE,
  payload: errorMessage,
});

export const fetchAnimesStart = () => ({
  type: MoviesActionTypes.FETCH_ANIME_START,
});

export const fetchAnimesSuccess = (animesMap) => ({
  type: MoviesActionTypes.FETCH_ANIME_SUCCESS,
  payload: animesMap,
});

export const fetchAnimesFailure = (errorMessage) => ({
  type: MoviesActionTypes.FETCH_ANIME_FAILURE,
  payload: errorMessage,
});

export const fetchDataStartAsync = () => {
  return (dispatch) => {
    const db = getFirestore(app);
    const serialsRef = collection(db, "serials");
    const moviesRef = collection(db, "movies");
    const animeRef = collection(db, "animes");
    dispatch(fetchMoviesStart());
    dispatch(fetchSerialsStart());
    dispatch(fetchAnimesStart());

    getDocs(moviesRef)
      .then((snapshot) => {
        const moviesMap = convertMoviesSnapshotToMap(snapshot);

        dispatch(fetchMoviesSuccess(moviesMap));
      })
      .catch((error) => dispatch(fetchMoviesFailure(error.message)));

    getDocs(serialsRef)
      .then((snapshot) => {
        const serialsMap = convertSerialsSnapshotToMap(snapshot);

        dispatch(fetchSerialsSuccess(serialsMap));
      })
      .catch((error) => dispatch(fetchSerialsFailure(error.message)));

    getDocs(animeRef)
      .then((snapshot) => {
        const animesMap = convertSerialsSnapshotToMap(snapshot);

        dispatch(fetchAnimesSuccess(animesMap));
      })
      .catch((error) => dispatch(fetchAnimesFailure(error.message)));
  };
};

// export const fetchSerialsStartAsync = () => {
//   return (dispatch) => {
//     const db = getFirestore(app);
//     const serialsRef = collection(db, "serials");
//     dispatch(fetchSerialsStart());

//     getDocs(serialsRef)
//       .then((snapshot) => {
//         const serialsMap = convertSerialsSnapshotToMap(snapshot);

//         dispatch(fetchSerialsSuccess(serialsMap));
//       })
//       .catch((error) => dispatch(fetchSerialsFailure(error.message)));
//   };
// };
