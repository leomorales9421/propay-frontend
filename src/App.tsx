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

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route index path="/dashboard" element={<DashboardPage />} />
        <Route path="/restaurants" element={<RestaurantComponent />} />
        <Route path="/users" element={<UsersComponents />} />
        <Route path="/qualifications" element={<QualificationsComponents />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
