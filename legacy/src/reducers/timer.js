import { SET_TIME, SAVE_INTERVAL, RESTART_TIME, UPDATE_STATUS } from '../actions';

const INITIAL_TIMER = {
  time: 30,
  interval: null,
  statusFinishTimer: false,
};

const timer = (state = INITIAL_TIMER, action) => {
  switch (action.type) {
  case UPDATE_STATUS:
    return { ...state, statusFinishTimer: !state.statusFinishTimer };
  case RESTART_TIME:
    return { ...state, time: 30 };
  case SET_TIME:
    return { ...state, time: state.time - action.value };
  case SAVE_INTERVAL:
    return { ...state, interval: action.value };
  default:
    return state;
  }
};

export default timer;
