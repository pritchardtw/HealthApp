import { FETCH_DAYS } from '../actions/action_days'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_DAYS:
      return action.payload;
      // return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
