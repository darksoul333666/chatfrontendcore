
import {
 CHANGE_TEMPLATE_CONFIGURATION
} from '../types';

export const ChangeTemplateConfiguration = data => dispatch => {
    dispatch({
      type: CHANGE_TEMPLATE_CONFIGURATION,
      payload: data,
    });
  };
