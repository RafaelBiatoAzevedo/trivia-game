import { getToken, getAsks, getGravatar } from '../services/serviceAPI';
import { prepareAnswers } from '../services/prepareAnswers';

export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const SAVE_ASKS = 'SAVE_ASKS';
export const SAVE_SCORE = 'SAVE_SCORE';
export const SET_TIME = 'SET_TIME';
export const SAVE_INTERVAL = 'SAVE_INTERVAL';
export const RESTART_TIME = 'RESTART_TIME';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const RESET_SETTINGS = 'RESET_SETTINGS';
export const RESET_ASKS = 'RESET_ASKS';

export const resetSettings = () => ({
  type: RESET_SETTINGS,
});

export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS,
  settings,
});

export const updateStatus = () => ({
  type: UPDATE_STATUS,
});

export const restartTime = () => ({
  type: RESTART_TIME,
});

export const saveInterval = (value) => ({
  type: SAVE_INTERVAL,
  value,
});

export const setTime = (value) => ({
  type: SET_TIME,
  value,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const login = (username, email) => ({
  type: LOGIN,
  username,
  email,
});

export const saveAsks = (asks) => ({
  type: SAVE_ASKS,
  asks,
});

export const resetAsks = () => ({
  type: RESET_ASKS,
});

export const tokenAction = (token) => ({
  type: TOKEN,
  token,
});

export const asyncToken = (settings) => (dispatch) => {
  getToken().then((response) => {
    localStorage.setItem('token', response.token);
    dispatch(tokenAction(response.token));
    getAsks(response.token, settings).then((responseAsks) =>
      dispatch(saveAsks(prepareAnswers(responseAsks.results)))
    );
  });
};

export const loginAction = (username, email) => (dispatch) => {
  getGravatar(email).then((response) =>
    dispatch(login(username, response.url))
  );
};
