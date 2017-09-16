import { FETCH_MEALS, MEAL_SELECTED } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_MEALS:
    return _.mapKeys(action.payload, 'id');
  case MEAL_SELECTED:
    return {...state, [action.payload.id]: action.payload};
  default:
    return state;
  }
}
