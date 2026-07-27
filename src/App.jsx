import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import SideBar from './components/SideBar/SideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Order/Order';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import ProtectedRoute from './components/ProtectRoute/ProtectRoute.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { url } from './assets/assets.js';

const App = () => {

  const [token, setToken] = useState(
    localStorage.getItem("adminToken")
  );

  return (
    <>
      <ToastContainer />

      {token && <Navbar setToken={setToken} />}

      {token && <hr />}

      <div className="app-content">

        {token && <SideBar />}

        <Routes>

          <Route
            path="/"
            element={
              token
                ? <Navigate to="/add" />
                : <AdminLogin url={url} setToken={setToken} />
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <Add url={url} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <List url={url} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order url={url} />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>
    </>
  );
};

export default App;
