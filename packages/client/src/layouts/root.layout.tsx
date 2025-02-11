import Navbar from "@/components/navbar.component";
import { AuthProvider } from "@/context/AuthProvider";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

export default function RootLayout() {
    return (
        <AuthProvider>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Outlet />
        </AuthProvider>
    )
}
