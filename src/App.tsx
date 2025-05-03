import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/Login/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/Auth/Register/RegisterPage";
import { Toaster } from "./components/ui/toaster";
import { RestaurantComponent } from "./components/RestaurantsComponents/RestaurantComponent";
import { UsersComponents } from "./components/UsersComponents/UsersComponents";
import { QualificationsComponents } from "./components/QualificationsComponents/QualificationsComponents";
import { ProtectedRoute, AuthRedirect } from "./auth/AuthContext";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          }
        />
        <Route
          index
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants"
          element={
            <ProtectedRoute>
              <RestaurantComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersComponents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qualifications"
          element={
            <ProtectedRoute>
              <QualificationsComponents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <RegisterPage />
            </AuthRedirect>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
