import { UPDATE_SETTINGS, RESET_SETTINGS } from '../actions';

const INITIAL_SETTINGS = {
  number: 5,
  category: 'All',
  difficulty: 'All',
  type: 'All',
};

const settings = (state = INITIAL_SETTINGS, action) => {
  switch (action.type) {
    case RESET_SETTINGS:
      return INITIAL_SETTINGS;
    case UPDATE_SETTINGS:
      console.log(action.settings);
      return action.settings;
    default:
      return state;
  }
};

export default settings;
