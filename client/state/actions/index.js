export const setInserts = inserts => ({
    type: 'SET_INSERTS',
    inserts,
});

export const setUser = user => ({
    type: 'SET_USER',
    user,
});

export const UserActions = {
    SET_INSERTS: 'SET_INSERTS',
    SET_USER: 'SET_USER',
};
