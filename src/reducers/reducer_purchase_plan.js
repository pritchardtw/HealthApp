import { PRO_PURCHASED, PRO_PURCHASE_ERROR, PRO_PURCHASE_PROCESSING } from '../actions'; //don't specify bc importing from Index
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
  case PRO_PURCHASE_ERROR:
    if (action.payload == state.doc) {
      return { ...state, error : true, processing : false }
    } else {
      return state;
    }
  case PRO_PURCHASE_PROCESSING:
    if (state.pro || state.processing) {
      return state;
    } else {
      return { ...state, processing: true, doc : action.payload }
    }
  case PRO_PURCHASED:
    return { ...state, pro : action.payload, processing : false, error : false};
  default:
    return state;
  }
}
