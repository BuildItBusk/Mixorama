import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx';
import Root from './routes/root.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import LoginPage from './routes/login.tsx';
import Search from './routes/Search.tsx';
import RandomCocktail from './routes/RandomCocktail.tsx';
import Profile from './routes/Profile.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
    { 
      path: "/login", 
      element: <LoginPage /> 
    },
    {
      path: "/profile", 
      element: <Profile />
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/random",
      element: <RandomCocktail />,
    }]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
);