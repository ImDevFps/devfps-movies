import { playerActionTypes } from "./player.types";

export const addFile = (file) => ({
  type: playerActionTypes.ADD_FILE,
  payload: file,
});
