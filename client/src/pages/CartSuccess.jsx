// CartSuccess.jsx
import React from 'react';
// import { CheckCircleIcon } from '@heroicons/react/solid';

const CartSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center'>
        {/* <CheckCircleIcon className='h-24 w-24 text-green-500 mx-auto' /> */}
        <h2 className='text-2xl font-semibold mt-4 text-gray-800'>
          Payment Successful!
        </h2>
        <p className='text-gray-600 mt-2'>
          Thank you for your purchase. Your payment was successfully processed.
        </p>
        <div className='mt-6'>
          <button
            className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            onClick={() => (window.location.href = '/dashboard')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSuccess;
