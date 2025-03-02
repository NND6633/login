import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Profile from "./page/Profile";

function App() {
  return (
    <Router>
      <AuthProvider>  {/* ✅ Bọc AuthProvider bên trong BrowserRouter */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
