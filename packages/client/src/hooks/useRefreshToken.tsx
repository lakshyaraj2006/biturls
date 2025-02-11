import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('/auth/refresh', null, {
            withCredentials: true
        });
        setAuth(prev => {

            return { ...prev, authToken: response.data.accessToken };
        })

        return response.data.accessToken
    }

    return refresh;
}

export default useRefreshToken;