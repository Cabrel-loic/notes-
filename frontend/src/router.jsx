import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/notFound"
import ProtectedRoute from "./components/protectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export default router