import React, { useState } from 'react';

const CartModal = ({ onClose }) => {
  return (
    <div className='cart-modal'>
      <div className='cart-modal-content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2 className='text-green p-12'>Cart</h2>
        {/* Add your cart items here */}
      </div>
    </div>
  );
};

export default CartModal;
