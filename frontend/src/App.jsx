import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import { RootLayout } from "./layouts/RootLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedAuthRoute, ProtectedRoute } from "./utils/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuthRoute>
              <Signup />
            </ProtectedAuthRoute>
          }
        />
      </Route>
    </>
  )
);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
