import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/api"
});

// instance.interceptors.request.use((config)=> {
//     const accessToken = localStorage.getItem("accessToken");
//     config.defaults.headers.common.authorization = `Bearer ${accessToken}`;
//     return config;
// })

const setToken = (token) => {
    if(token) {
        return instance.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    instance.defaults.headers.common.authorization = "";
}

instance.interceptors.response.use(response => response, async(error) => {
    if(error.response.status === 401) {
        try {
            const refreshToken = localStorage.getItem("refreshToken")
            const {data} = await instance.post("/auth/refresh", {refreshToken});
            setToken(data.accessToken)
            localStorage.setItem("refreshToken", data.refreshToken)
            return axios(error.config)
        }
        catch(error) {
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
} )



export const signup = async (data) => {
    const {data: result} = await instance.post("/auth/register", data);
    setToken(result.token);
    return result;
}

export const login = async (data) => {
    const {data: result} = await instance.post("/auth/login", data);
    // localStorage.setItem("accessToken", result.accessToken)
    setToken(result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken)
    return result;
}

export const logout = async() => {
    const data = await instance.post("/auth/logout");
    setToken();
    return data;
}

export const getCurrent = async(token) => {
    try {
        setToken(token);
        const {data} = await instance.get("/auth/current");
        return data;
    } catch (error) {
        setToken();
        throw error;
    }
}

export default instance;