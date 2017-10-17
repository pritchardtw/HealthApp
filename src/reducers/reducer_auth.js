import { INIT_AUTH, LOGGED_IN, LOGGED_OUT, USER_INFO } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {

  let user = null;

  switch (action.type) {
  case INIT_AUTH:
  case LOGGED_IN:
    user = action.payload;
    return { ...state, auth: true, user };
  case LOGGED_OUT:
    user = null;
    return { ...state, auth: false, user };
  default:
    return state;
  }
}
