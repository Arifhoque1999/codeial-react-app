import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks";
import { Home, Login, Settings, Signup, UserProfile } from "../pages";
import { Loader, Navbar } from "./";
import { Navigate } from "react-router-dom";

// function PrivateRoute({ children, ...rest }) {
//   const auth = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={() => {
//         if (auth.user) {
//           return children;
//         }

//         return <Navigate to="/login" />;
//       }}
//     />
//   );
// }

const Error = () => {
  return <h1>404</h1>;
};
function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={[]} />} />
          <Route path="/register" element={<Signup />} />

          <Route
            path="/settings"
            element={
              // <PrivateRoute>
                <Settings />
              // </PrivateRoute>
            }
          />

          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
