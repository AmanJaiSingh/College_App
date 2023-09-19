import Home from "./Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Update from "./Pages/Update";
import Create from "./Pages/Create";
import Login from "./Pages/Login";
import { useSelector } from "react-redux";
import Register from "./Pages/Register";

function App() {
  

  const user = useSelector((state) => state.user.currentUser);
  function AuthRoute({ children }) {
    // console.log(!user);
    if (!user) {
      return <Navigate to="/Login" />;
    }
    return children;
  }
  function AuthRoute2({ children }) {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route
          path="/Register"
          element={
            <AuthRoute2>
              <Register />
            </AuthRoute2>
          }
        />
        <Route
          path="/Update/:id"
          element={
            <AuthRoute>
              <Update />
            </AuthRoute>
          }
        />
        <Route
          path="/create"
          element={
            <AuthRoute>
              <Create />
            </AuthRoute>
          }
        />
        <Route
          path="Login"
          element={
            <AuthRoute2>
              <Login />
            </AuthRoute2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
