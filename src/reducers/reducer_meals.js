import { FETCH_MEALS } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_MEALS:
    // return _.mapKeys(action.payload.data, 'id');
    return action.payload;
  default:
    return state;
  }
}
