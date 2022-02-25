import { combineReducers } from 'redux';
import player from './player';
import askAndAnswersReducer from './askAndAnswerReducer';
import token from './token';
import timer from './timer';
import settings from './settings';

const rootReducer = combineReducers({
  player,
  askAndAnswersReducer,
  token,
  timer,
  settings,
});

export default rootReducer;
