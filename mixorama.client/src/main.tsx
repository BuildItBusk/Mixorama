import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx';
import Root from './routes/root.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import LoginPage from './routes/login.tsx';
import Account from './routes/Account.tsx';
import Secret from './routes/secret.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { 
    path: "/login", 
    element: <LoginPage /> 
  },
  {
    path: "/account", 
    element: <Account />
  },
  {
    path: "/secret",
    element: <Secret />,
  }
]);



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
);