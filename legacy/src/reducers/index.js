import { combineReducers } from 'redux';
import player from './player';
import game from './game';
import token from './token';
import timer from './timer';
import settings from './settings';

const rootReducer = combineReducers({
  player,
  game,
  token,
  timer,
  settings,
});

export default rootReducer;
