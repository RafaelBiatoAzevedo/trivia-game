import { getToken, getAsks } from '../services/serviceAPI';
import { prepareAnswers } from '../services/prepareAnswers';

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_ASKS = 'SAVE_ASKS';
export const SAVE_PLAYER = 'SAVE_PLAYER';
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

export const savePlayerAction = (player) => ({
  type: SAVE_PLAYER,
  player,
});

export const saveAsks = (asks) => ({
  type: SAVE_ASKS,
  asks,
});

export const resetAsks = () => ({
  type: RESET_ASKS,
});

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const savePlayer = (player) => (dispatch) => {
  localStorage.setItem('@TriviaGame:player', JSON.stringify(player));
  dispatch(savePlayerAction(player));
};

export const createAsks = (settings) => (dispatch) => {
  getToken().then((response) => {
    localStorage.setItem('@TriviaGame:token', response.token);
    dispatch(saveToken(response.token));
    getAsks(response.token, settings).then((responseAsks) =>
      dispatch(saveAsks(prepareAnswers(responseAsks.results)))
    );
  });
};
