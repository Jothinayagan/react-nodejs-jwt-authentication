import Axios from "axios";
import Cookies from "js-cookie";

const createAccessFromRefresh = (refreshToken) => {
    console.log(`Refreshing Token!`);

    const REFRESH_URI = process.env.REACT_APP_REFRESH_URI;

    return new Promise((resolve, _reject) => {
        Axios.post(REFRESH_URI, { token: refreshToken }).then((res) => {
            if (res.data.success === false) {
                resolve(false);
            } else {
                const { accessToken } = res.data;
                Cookies.set("access", accessToken);
                resolve(true);
            }
        });
    });
};

const hasAccess = async (accessToken, refreshToken) => {
    if (!refreshToken) {
        console.log(`hasAccess: refreshToken is not present`);
        return null;
    }

    if (accessToken === undefined) {
        console.log(`hasAccess: accessToken is undefined`);
        return await createAccessFromRefresh(refreshToken);
    }

    console.log("hasAccess: accessToken found!");
    return accessToken;
};

export const sendReqToRoute = async () => {
    // Check the accessToken has validity
    let accessToken = Cookies.get("access");
    let refreshToken = Cookies.get("refresh");

    // passing args to hasAccess function
    accessToken = await hasAccess(accessToken, refreshToken);

    if (!accessToken) return false;

    const API = process.env.REACT_APP_PROTECTED_URI;
    Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const headersOptions = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    };

    // const axiosOptions = {
    //     baseURL: API,
    //     method: "get",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // };

    // let instance = Axios.create(axiosOptions);

    // instance.interceptors.request.use(
    //     (config) => (config.headers.Authorization = `Bearer ${accessToken}`)
    // );

    console.log(`access token: Bearer ${accessToken}`);

    return new Promise((resolve, _reject) => {
        Axios.get(API, {}, headersOptions)
            .then((res) => {
                console.log(res.data);
                resolve(true);
            })
            .catch((err) => {
                resolve(false);
                console.error(`Error caught @ checkUserHasValidToken: ${err}`);
            });
    });
};

export const userLoginRequest = (loginCredentials) => {
    const LOGIN_API = process.env.REACT_APP_LOGIN_URI;
    const headersOptions = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };

    return new Promise((resolve, _reject) => {
        Axios.post(LOGIN_API, loginCredentials, headersOptions)
            .then((res) => {
                console.log(res.data);
                const { accessToken, refreshToken } = res.data;
                Cookies.set("access", accessToken);
                Cookies.set("refresh", refreshToken);
                resolve(true);
            })
            .catch((err) => {
                console.error(`Error caught @ userLoginRequest: ${err}`);
                resolve(false);
            });
    });
};