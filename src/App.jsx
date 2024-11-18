import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/home/index";
import About from "./pages/about/index";
import UserSignUp from "./pages/user/UserSignUp";
import UserOther from "./pages/user/UserOther";
import PlumberSignUp from "./pages/plumber/PlumberSignUp";
import PlumberLogin from "./pages/plumber/PlumberLogin";
import Dashboard from "./pages/plumber-dashboard/index";
import LeakageForm from "./pages/home/LeakReportForm";
import PlumberChecklistForm from "./pages/plist/PlumbersCheckList";
import LeakageReportList from "./pages/home/LeakageReportList";
import Welcome from "./pages/welcome/index"
import AdminDashboard from "./pages/admin-dashboard";
import AdminLogin from "./pages/admin-dashboard/adlogin";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return <Navigate to="/plogin" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
       
        <Route path="/sign" element={<UserSignUp />} />
        <Route path="/user-login" element={<UserOther />} />
        <Route 
          path="/leak" 
          element={
            <ProtectedRoute>
              <LeakageForm />
            </ProtectedRoute>
          } 
        />

        <Route path="/psign" element={<PlumberSignUp />} />
        <Route path="/plogin" element={<PlumberLogin />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/plumber-checklist" 
          element={
            <ProtectedRoute>
              <PlumberChecklistForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/leakage-reports" 
          element={
            <ProtectedRoute>
              <LeakageReportList />
            </ProtectedRoute>
          } 
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
         

        {/* Catch all route - 404 */}
        <Route 
          path="*" 
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <button 
                  onClick={() => window.history.back()} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Go Back
                </button>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
