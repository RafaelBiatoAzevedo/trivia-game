import { SAVE_TOKEN } from '../actions';

const INITIAL_TOKEN = '';

const token = (state = INITIAL_TOKEN, action) => {
  if (action.type === SAVE_TOKEN) return action.token;
  else return state;
};

export default token;
