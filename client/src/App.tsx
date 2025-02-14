import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import PricingPage from "./pages/PricingPage";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import axios from "axios";
import React from "react";

function App() {
  // const queryClient = new QueryClient();
  const { data: user, refetch: refetchData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/user/current-user`,
        { withCredentials: true }
      );
      return response.data.user;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  return (
    <BrowserRouter>
      <div className="App h-full bg-white dark:bg-gray-800 transition-colors">
        <Navbar user={user} />
        <div className="p-4 sm:p-8 xl:p-12 lg:p-16">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/pricing"
              element={<PricingPage refetchData={refetchData} user={user} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
