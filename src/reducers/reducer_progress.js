import { UPDATE_PROGRESS } from '../actions/action_progress'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_PROGRESS:
      return action.payload;
    default:
      return state;
  }
}
