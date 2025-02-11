import { UserCredentials } from "@/types/user-credentials";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({} as UserCredentials);

        try {
            await axios.post('/auth/logout', null, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    return logout;
}

export default useLogout;