import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
);
