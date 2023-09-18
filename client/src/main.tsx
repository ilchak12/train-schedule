import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterPage } from "./pages/Register.page.tsx";
import { LoginPage } from "./pages/Login.page.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from "./pages/Home.page.tsx";
import { Protected } from "./pages/Protected.tsx";
import "react-datepicker/dist/react-datepicker.css";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected element={<HomePage />} />
    },
    {
        path: '/signup',
        element: <RegisterPage />
    },
    {
        path: '/signin',
        element: <LoginPage />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />

        <ToastContainer position={'top-right'} autoClose={2000} />
    </Provider>
  </React.StrictMode>,
)
