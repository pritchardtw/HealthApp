import { FETCH_DAYS } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_DAYS:
    console.log(action);
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}
