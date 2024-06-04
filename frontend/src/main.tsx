import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AuthProvider from "./auth/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
