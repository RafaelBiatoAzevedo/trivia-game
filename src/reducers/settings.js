import { UPDATE_SETTINGS } from '../actions';

const INITIAL_SETTINGS = {
  number: 5,
  category: 'All',
  difficulty: 'All',
  type: 'All',
};

const settings = (state = INITIAL_SETTINGS, action) => {
  if (action.type === UPDATE_SETTINGS) return action.objSettings;
  return state;
};

export default settings;
