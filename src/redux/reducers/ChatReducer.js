import { CHANGE_TEMPLATE_CONFIGURATION } from '../types';

const stateChat = {
  templateStyle: 'Amigable',
  templateProfesion: 'Doctor'
};

const chatReducer = function(state = stateChat, action) {
  switch (action.type) {
    case CHANGE_TEMPLATE_CONFIGURATION:
      return {
        ...state,
        templateStyle: action.payload.templateStyle,
        templateProfesion: action.payload.templateProfesion
      };
    default:
      return state;
  }
};

export default chatReducer;
