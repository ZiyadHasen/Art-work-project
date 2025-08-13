
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddArtwork,
  Events,
  AllArtworks,
  Profile,
  Admin,
  EditArtwork,
  MyArtworks,
  Stats,
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
import { loader as StatsLoader } from './pages/Stats';
import { action as ProfileAction } from './pages/Profile';
import CartSuccess from './pages/CartSuccess';
import CartCancel from './pages/CartCancel';
import ErrorBoundary from './components/ErrorBoundary';

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
        path: 'cart-success',
        element: <CartSuccess />,
        // loader: allArtworksLoader,
      },
      {
        path: 'cart-canceled',
        element: <CartCancel />,
        // loader: allArtworksLoader,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { index: true, element: <AddArtwork />, action: AddArtworkAction },
          {
            path: 'events',
            element: <Events />,
          },
          {
            path: 'all-artworks',
            element: <AllArtworks />,
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
            path: 'stats',
            element: <Stats />,
            loader: StatsLoader,
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
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
        style={{ zIndex: 9999999 }}
        toastStyle={{ zIndex: 9999999 }}
      />
    </ErrorBoundary>
  );
};

export default App;
