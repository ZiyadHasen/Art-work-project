import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaCartPlus } from 'react-icons/fa';
import Logo from './logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
import CartModal from './CartModal';
import { useCartContext } from '../contexts/cartContext'; // Import the CartContext

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { cartItems, removeFromCart } = useCartContext(); // Destructure cartItems from the context

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' onClick={toggleSidebar} className='toggle-btn'>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle onClick={toggleSidebar} />
          <LogoutContainer />
          <div className='relative inline-block mx-4'>
            <button className='relative' onClick={handleShow}>
              <FaCartPlus className='text-3xl text-current' />
              <span className='absolute top-0 right-0 text-white text-sm font-bold rounded-md px-[6px] py-[2px] bg-[#ecbb21] transform translate-x-1/2 -translate-y-1/2'>
                {cartItems.length}
              </span>
            </button>
          </div>
        </div>
        <CartModal
          show={show}
          handleClose={handleClose}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
      </div>
    </Wrapper>
  );
};

export default Navbar;
