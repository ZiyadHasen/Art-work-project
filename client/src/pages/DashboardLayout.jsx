import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallNavbar } from '../components';

import { useState, createContext, useContext, useEffect } from 'react';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import CartProvider from '../contexts/cartContext'; // Import CartProvider

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    // For demo users, don't redirect to home if there's an error
    if (error?.response?.status === 401) {
      return redirect('/');
    }
    // For other errors, try to continue
    return { user: null };
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const data = useLoaderData();
  const user = data?.user || null;
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  // Add error boundary effect
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    try {
      navigate('/');
      await customFetch.get('/auth/logout');
      toast.success('logging out ...');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <CartProvider>
        <Wrapper>
          <main className='dashboard'>
            <BigSidebar />
            <SmallNavbar />
            <div>
              <Navbar />
              <div className='dashboard-page'>
                <Outlet context={{ user }} />
              </div>
            </div>
          </main>
        </Wrapper>
      </CartProvider>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
