const insertsReducer = (state = {inserts: null}, action) => {
    switch (action.type) {
    case 'SET_INSERTS':
        return action;
    default:
        return state;
    }
};

export default insertsReducer;
