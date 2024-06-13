import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

const CartCancel = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-6'>
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Payment Cancellation
        </h2>
        <p className='text-lg text-center text-gray-600 mb-6'>
          Your payment was cancelled.
        </p>
        <div className='flex justify-center mt-6'>
          <Link
            to='/dashboard'
            className='px-4 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCancel;
