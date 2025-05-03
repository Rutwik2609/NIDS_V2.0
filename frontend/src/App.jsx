import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Predict from "./pages/predict/Predict.jsx";
import BulkPredict from "./pages/predict/BulkPredict";
import Abouts from "./pages/abouts.jsx";
import Results from "./pages/results.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/me", {
          withCredentials: true,
        });
        if (data.error) return null;
        return data;
      } catch (error) {
        console.error("Error fetching authUser:", error);
        return null;
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Routes>
        {/* Routes for authenticated users */}
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/predict" element={authUser ? <Predict /> : <Navigate to="/login" />} />
        <Route path="/bulk-predict" element={authUser ? <BulkPredict /> : <Navigate to="/login" />} />
        <Route path="/results" element={authUser ? <Results /> : <Navigate to="/login" />} />
        <Route path="/abouts" element={authUser ? <Abouts /> : <Navigate to="/login" />} />

        {/* Routes for non-authenticated users */}
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Register /> : <Navigate to="/" />} />

        {/* 404 - Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

