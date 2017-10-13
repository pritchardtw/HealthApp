import { combineReducers } from 'redux';
import DaysReducer from './reducer_days';
import MealsReducer from './reducer_meals';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  days: DaysReducer,
  meals: MealsReducer,
  auth: AuthReducer,
});

export default rootReducer;
