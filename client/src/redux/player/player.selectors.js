import { createSelector } from "reselect";

const selectPlayer = (state) => state.player;

export const selectFile = createSelector(
  [selectPlayer],
  (playing) => playing.file
);
