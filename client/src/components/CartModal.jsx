import React from 'react';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
import { PiMinusLight } from 'react-icons/pi';

const CartModal = ({
  show,
  handleClose,
  cartItems,
  handleIncrease,
  handleDecrease,
  handleRemove,
}) => {
  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-[#F0F0F0] w-full max-w-md mx-auto rounded-lg p-4 shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl text-black self-end font-semibold'>
            Cart Summary
          </h2>
          <FaTimes
            onClick={handleClose}
            className='text-[#b01e1e] cursor-pointer text-2xl '
          />
        </div>
        <div className='space-y-4'>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between border-b pb-2 mb-2'
              >
                <div>
                  <h5 className='text-lg text-black font-semibold'>
                    {item.title}
                  </h5>
                  <p className='text-black'>Price: {Number(item.price)} birr</p>
                </div>
                <div className='flex items-center'>
                  <button
                    className='text-black focus:outline-none'
                    onClick={() => handleDecrease(index)}
                  >
                    <PiMinusLight />
                  </button>
                  <span className='px-2 text-black'>{item.quantity}</span>
                  <button
                    className='text-black focus:outline-none'
                    onClick={() => handleIncrease(index)}
                  >
                    <BsPlusLg />
                  </button>
                  <button
                    className='text-[#b01e1e] text-lg cursor-pointer focus:outline-none'
                    onClick={() => handleRemove(index)}
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className='flex justify-between items-center mt-4'>
          <h5 className='text-lg text-black font-semibold'>
            Total Price: {calculateTotal()} birr
          </h5>
          <button
            className='px-3 py-2 rounded-md bg-[#2cb1bc] hover:bg-[#14919b] text-[#fff] text-[14px] border-0'
            onClick={handleClose}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
