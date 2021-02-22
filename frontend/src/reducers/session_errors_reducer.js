// When we receieve a new set session errors, we want to replace the old errors in the state. If we successfully log the user in, 
// we want to clear the session errors.

import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
  } from '../actions/session_actions';
  
  const _nullErrors = [];
  
  const SessionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_SESSION_ERRORS:
        return action.errors;
      case RECEIVE_CURRENT_USER:
        return _nullErrors;
      default:
        return state;
    }
  };
  
  export default SessionErrorsReducer;