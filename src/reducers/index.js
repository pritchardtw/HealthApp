import { combineReducers } from 'redux';
import MealsReducer from './reducer_meals';

const rootReducer = combineReducers({
  meals: MealsReducer,
});

export default rootReducer;
