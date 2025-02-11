import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root.layout";
import PersistLogin from "./components/persist-login.component";
import GuestRoutes from "./utils/guest-routes";
import ProtectedRoutes from "./utils/protected-routes";
import Home from "./views/home.view";
import AuthLayout from "./layouts/auth.layout";
import Login from "./views/login.view";
import SignUp from "./views/signup.view";
import RedirectToURL from "./views/url-view.view";
import EditUrl from "./views/edit.view";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            path: '/visit/:id',
            element: <RedirectToURL />
          },
          {
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/",
                element: <Home />
              },
              {
                path: '/edit/:id',
                element: <EditUrl />
              },
            ]
          }
        ]
      }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            element: <GuestRoutes />,
            children: [
              {
                path: "/auth/login",
                element: <Login />
              },
              {
                path: "/auth/signup",
                element: <SignUp />
              }
            ]
          }
        ]
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
