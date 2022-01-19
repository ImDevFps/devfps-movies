import MoviesActionTypes from "./movies.types";
const INITIAL_STATE = {
  films: null,
  serials: null,
  animes: null,
  isFetchingFilms: false,
  isFetchingSerials: false,
  isFetchingAnimes: false,
  filmsError: undefined,
  serialsError: undefined,
  animesError: undefined,
};

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MoviesActionTypes.FETCH_MOVIES_START:
      return {
        ...state,
        isFetchingFilms: true,
      };
    case MoviesActionTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        isFetchingFilms: false,
        films: action.payload,
      };
    case MoviesActionTypes.FETCH_MOVIES_FAILURE:
      return {
        ...state,
        isFetchingFilms: false,
        filmsError: action.payload,
      };
    case MoviesActionTypes.FETCH_SERIALS_START:
      return {
        ...state,
        isFetchingSerials: true,
      };
    case MoviesActionTypes.FETCH_SERIALS_SUCCESS:
      return {
        ...state,
        isFetchingSerials: false,
        serials: action.payload,
      };
    case MoviesActionTypes.FETCH_SERIALS_FAILURE:
      return {
        ...state,
        isFetchingSerials: false,
        serialsError: action.payload,
      };
    case MoviesActionTypes.FETCH_ANIME_START:
      return {
        ...state,
        isFetchingAnimes: true,
      };
    case MoviesActionTypes.FETCH_ANIME_SUCCESS:
      return {
        ...state,
        isFetchingAnimes: false,
        animes: action.payload,
      };
    case MoviesActionTypes.FETCH_ANIME_FAILURE:
      return {
        ...state,
        isFetchingAnimes: false,
        animesError: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;
