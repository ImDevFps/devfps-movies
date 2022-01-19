import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import moviesReducer from "./movies/movies.reducer";
import playerReducer from "./player/player.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  timeout: null,
  whitelist: ["player"],
};

const rootReducer = combineReducers({
  movies: moviesReducer,
  player: playerReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
