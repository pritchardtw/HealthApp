import { FETCH_DAYS } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_DAYS:
    return _.mapKeys(action.payload, 'id');
  default:
    return state;
  }
}
