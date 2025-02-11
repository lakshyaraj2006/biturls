import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { auth } = useAuth();
    const logout = useLogout();

    return (
        <nav className="flex items-center justify-between p-4 shadow">
            <Link to="/" className="text-2xl font-bold text-rose-500">BitUrls</Link>

            <ul className="flex items-center gap-4">
                {
                    auth.authToken ? <>
                        <li>
                            <button onClick={() => logout()} className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium shadow-md w-full hover:shadow-lg hover:bg-rose-600 transition">
                                Log Out
                            </button>
                        </li>
                    </> : <>
                        <li>
                            <Link to="/auth/login">
                                <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium shadow-md w-full hover:shadow-lg hover:bg-rose-600 transition">
                                    Log In
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth/signup">
                                <button className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium shadow-md w-full hover:shadow-lg hover:bg-rose-600 transition">
                                    Sign Up
                                </button>
                            </Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}
