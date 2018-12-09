import {combineReducers} from 'redux';
import userReducer from './reducers/user';

export default combineReducers({
    user: userReducer,
});
