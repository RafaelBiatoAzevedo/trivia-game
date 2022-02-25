import { SAVE_ASKS, RESET_ASKS } from '../actions';

const INITIAL_STATE = [];

const askAndAnswersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_ASKS:
      return [...action.asks];
    case RESET_ASKS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default askAndAnswersReducer;
