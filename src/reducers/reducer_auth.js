import { LOGGED_IN } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case LOGGED_IN:
    let user = action.payload.additionalUserInfo;
    return { ...state, auth: true, user };
  default:
    return state;
  }
}
