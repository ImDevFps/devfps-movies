import { createSelector } from "reselect";

const selectMovies = (state) => state.movies;

export const selectFilms = createSelector(
  [selectMovies],
  (movies) => movies.films
);

export const selectSerials = createSelector(
  [selectMovies],
  (serials) => serials.serials
);

export const selectAnimes = createSelector(
  [selectMovies],
  (animes) => animes.animes
);

export const selectGendre = (gendreUrlParam) =>
  createSelector([selectMovies], (gendre) =>
    gendre ? gendre[gendreUrlParam] : null
  );

export const selectMovie = (movieUrlParam) =>
  createSelector([selectFilms], (movie) =>
    movie ? movie[movieUrlParam] : null
  );

export const selectSerial = (serialUrlParam) =>
  createSelector([selectSerials], (episode) =>
    episode ? episode[serialUrlParam] : null
  );

export const selectAnime = (animeUrlParam) =>
  createSelector([selectAnimes], (anime) =>
    anime ? anime[animeUrlParam] : null
  );

export const selectMoviesForPreview = createSelector([selectFilms], (tracks) =>
  tracks ? Object.keys(tracks).map((key) => tracks[key]) : []
);

export const selectSerialsForPreview = createSelector(
  [selectSerials],
  (episodes) =>
    episodes ? Object.keys(episodes).map((key) => episodes[key]) : []
);

export const selectAnimesForPreview = createSelector(
  [selectAnimes],
  (episodes) =>
    episodes ? Object.keys(episodes).map((key) => episodes[key]) : []
);

export const selectIsMoviesFetching = createSelector(
  [selectMovies],
  (movies) => movies.isFetchingFilms
);

export const selectIsSerialsFerching = createSelector(
  [selectMovies],
  (serials) => serials.isFetchingSerials
);

export const selectIsAnimesFetching = createSelector(
  [selectMovies],
  (serials) => serials.isFetchingAnimes
);
