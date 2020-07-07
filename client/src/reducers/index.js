import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReduser from './auth';
import dashboardReduser from './dashboard';

export default combineReducers({
   form: formReducer,
   auth: authReduser,
   dash: dashboardReduser
});

