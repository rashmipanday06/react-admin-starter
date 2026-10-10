
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
import CreateOrder from "./componetns/orders/createOrder";
import EditOrder from "./componetns/orders/editOrder";
import ViewOrder from "./componetns/orders/viewOrder";
import Footer from "./componetns/footer";

function App() {
  const { token } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {token && <NavBar />}

      <main className="flex-1 pb-16 sm:pb-8">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
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
              <ProtectedRoute allowedRoles={["admin", "manager", "customer"]}>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-order"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "customer"]}>
                <CreateOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-order/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "customer"]}>
                <EditOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/view-order/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "customer"]}>
                <ViewOrder />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
