const authenticationReducer = (state = false, action) => {
    switch (action.type) {
        case "USER_AUTHENTICATED_TRUE":
            return (state = true);
        case "USER_AUTHENTICATED_FALSE":
            return (state = false);
        default:
            return state;
    }
};

export default authenticationReducer;
