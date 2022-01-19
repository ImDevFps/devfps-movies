import { playerActionTypes } from "./player.types";
const INITIAL_STATE = {
  file: null,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playerActionTypes.ADD_FILE:
      return {
        ...state,
        file: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
