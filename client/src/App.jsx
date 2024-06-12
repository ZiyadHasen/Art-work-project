import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddArtwork,
  Stats,
  AllArtworks,
  Profile,
  Admin,
  EditArtwork,
  MyArtworks,
} from './pages/index';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as AddArtworkAction } from './pages/AddArtwork';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allArtworksLoader } from './pages/AllArtworks';
import { loader as myArtworksLoader } from './pages/MyArtworks';
import { loader as EditArtworkLoader } from './pages/EditArtwork';
import { action as EditArtworkAction } from './pages/EditArtwork';
import { action as DeleteArtworkAction } from './pages/DeleteArtwork';
import { loader as AdminLoader } from './pages/Admin';
import { action as ProfileAction } from './pages/Profile';
import CartSuccess from './pages/CartSuccess';
import CartCancel from './pages/CartCancel';

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};
checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/register',
        element: <Register />,
        action: registerAction,
      },
      { path: '/landing', element: <Landing /> },
      { path: '/login', element: <Login />, action: loginAction },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddArtwork />, action: AddArtworkAction },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-artworks',
            element: <AllArtworks />,
            loader: allArtworksLoader,
          },
          {
            path: 'cart-success',
            element: <CartSuccess />,
            loader: allArtworksLoader,
          },
          {
            path: 'cart-canceled',
            element: <CartCancel />,
            loader: allArtworksLoader,
          },
          {
            path: 'my-artworks',
            element: <MyArtworks />,
            loader: myArtworksLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: ProfileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: AdminLoader,
          },
          {
            path: 'edit-artwork/:id',
            element: <EditArtwork />,
            action: EditArtworkAction,
            loader: EditArtworkLoader,
          },
          { path: 'delete-artwork/:id', action: DeleteArtworkAction },
        ],
      },
      { path: '/error', element: <Error /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
