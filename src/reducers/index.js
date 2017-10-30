import { combineReducers } from 'redux';
import DaysReducer from './reducer_days';
import MealsReducer from './reducer_meals';
import AuthReducer from './reducer_auth';
import ProgressReducer from './reducer_progress';
import PurchasePlanReducer from './reducer_purchase_plan';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  days: DaysReducer,
  meals: MealsReducer,
  auth: AuthReducer,
  progress: ProgressReducer,
  form: formReducer,
  purchase_plan: PurchasePlanReducer,
});

export default rootReducer;
