import { combineReducers } from 'redux';
import DaysReducer from './reducer_days';
import MealsReducer from './reducer_meals';

const rootReducer = combineReducers({
  days: DaysReducer,
  meals: MealsReducer,
});

export default rootReducer;
