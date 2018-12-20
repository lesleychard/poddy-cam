import {combineReducers} from 'redux';
import {
    insertsReducer,
    userReducer,
} from './reducers';

export default combineReducers({
    inserts: insertsReducer,
    user: userReducer,
});
