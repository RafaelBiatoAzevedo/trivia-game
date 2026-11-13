import { SAVE_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  if (action.type === SAVE_PLAYER) return action.player;
  else return state;
};

export default player;
