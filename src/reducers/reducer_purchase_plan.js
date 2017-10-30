import { PURCHASED_PRO } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case PURCHASED_PRO:
    const pro = action.payload.purchased;
    console.log("Purchased Pro Running", pro);
    return { ...state, pro };
  default:
    return state;
  }
}
