import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const CartCancel = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-md w-full'>
        <h2 className='text-3xl font-semibold text-red-600 mb-4'>
          Payment Cancellation
        </h2>

        <div className='flex justify-center'>
          <Link
            to='/dashboard'
            className='bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-lg'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartCancel;
