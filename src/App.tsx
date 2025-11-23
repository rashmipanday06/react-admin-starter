import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./componetns/context/authContext";

import Login from "./componetns/pages/login/login";
import Dashboard from "./componetns/pages/dashboard";
import NotFound from "./componetns/pages/notFound";
import Users from "./componetns/pages/users";
import ProtectedRoute from "./routes/protectedRoute";

import NavBar from "./componetns/navbar";
import CreateUser from "./componetns/user/createUser";
import EditUser from "./componetns/user/editUser";
import Orders from "./componetns/pages/order";

function App() {
  const { token } = useAuth();   // ⬅ Get login status

  return (
    <>
      {/* Show navbar only if logged in */}
      {token && <NavBar />}

      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />
       <Route
  path="/edit-user/:id"
  element={
    <ProtectedRoute>
      <EditUser />
    </ProtectedRoute>
  }
/>
       <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>


        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
