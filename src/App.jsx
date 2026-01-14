import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateIssue from "./pages/CreateIssue";
import Issues from "./pages/Issues";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-issue"
        element={
          <ProtectedRoute>
            <CreateIssue />
          </ProtectedRoute>
        }
      />

      <Route
        path="/issues"
        element={
          <ProtectedRoute>
            <Issues />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
