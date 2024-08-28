import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Brands from './components/brands/Brands';
import Cart from './components/cart/Cart';
import Categories from './components/categories/Categories';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import NotFound from './components/notFound/NotFound';
import ProductDetails from './components/productDetails/ProductDetails';
import Products from './components/products/Products';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Register from './components/register/Register';
import { AuthContextProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import ShippingAddress from './components/shippingAdress/ShippingAdress';
import Orders from './components/Ordres/Orders';
import { Offline } from 'react-detect-offline';
import ResetPassword from "./components/ResetPassword/ResetPassword";
import EnterNewPassword from "./components/EnterNewPassword/Enternewpass";
import ForgetPassword from './components/forgetpassword/ForgetPassword';
import NameContextProvider from './contexts/NameContext';


const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "login", element:<Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "shippingadress/:cartid", element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
      {path: "/forgot-password", element:<ForgetPassword />},
      { path: "/resetpassword",element: <ResetPassword />}   ,  
      {path: "/enternewpassword",element:  <EnterNewPassword />}, 
      { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      
      <NameContextProvider>
<RouterProvider router={routers}></RouterProvider>
<Offline>Only shown offline (surprise!)</Offline>
<ToastContainer />
</NameContextProvider>
      
    </AuthContextProvider>
  );
}

export default App;
