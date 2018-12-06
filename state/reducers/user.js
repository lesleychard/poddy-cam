// import {AsyncStorage} from 'react-native';

// export const actions = {
//     SET_USER: 'SET_USER',
// };

// const reduceSetUser = (user) => {
//     AsyncStorage.setItem('USER', JSON.stringify(user));
// };

// const getInitialState = () => ({
//     user: null,
// });

// export const settingsReducer = (state = getInitialState(), {type}) => {
//     switch (type) {
//     case actions.SET_USER:
//         return reduceSetUser(state);
//     default:
//         return state;
//     }
// };

const userReducer = (state = {user: null}, action) => {
    switch (action.type) {
    case 'SET_USER':
        return action;
    default:
        return state;
    }
};

export default userReducer;
