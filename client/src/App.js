import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Kids from "./Components/Kids";
import Profile from "./Components/Profile";
import FetchCartApi from "./Components/api/FetchCartApi";
const ProductPage = React.lazy(() => import("./Components/ProductPage"));
const Cart = React.lazy(() => import("./Components/Cart"));
const Logout = React.lazy(() => import("./Components/Logout"));
const Register = React.lazy(() => import("./Components/Register"));
const Login = React.lazy(() => import("./Components/Login"));
const Home = React.lazy(() => import("./Components/Home"));
const Header = React.lazy(() => import("./Components/Header"));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <FetchCartApi />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={0}
        theme="colored"
      />
    </>
  );
}

export default App;
