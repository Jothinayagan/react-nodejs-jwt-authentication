export const authTrue = () => {
    return {
        type: "USER_AUTHENTICATED_TRUE",
    };
};

export const authFalse = () => {
    return {
        type: "USER_AUTHENTICATED_FALSE",
    };
};
