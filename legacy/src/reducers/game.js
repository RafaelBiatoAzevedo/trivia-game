import { SAVE_ASKS, RESET_GAME, SET_STATUS_GAME } from '../actions';

const INITIAL_STATE = {
  asks: [],
  status: false,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_ASKS:
      return { ...state, asks: action.asks };
    case RESET_GAME:
      return INITIAL_STATE;
    case SET_STATUS_GAME:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export default game;
