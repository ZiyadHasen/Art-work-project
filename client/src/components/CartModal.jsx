import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const CartModal = ({ show, handleClose, cartItems, removeFromCart }) => {
  console.log(cartItems);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
  }, [show]);

  const calculateTotal = () => {
    // Check if cartItems is not an array or if it's empty
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return '0.00'; // Return 0 if cartItems is not valid
    }

    // Sum up the prices of all items
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + Number(item.artwork.price),
      0
    );

    // Return the total price with "birr" and two decimal places
    return `${totalPrice.toFixed(2)} birr`;
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('/api/v1/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error('Error:', data.error);
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during checkout');
    }
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
                    {item.artwork.title}
                  </h5>
                  <p className='text-black'>
                    Price: {Number(item.artwork.price)} birr
                  </p>
                </div>
                <div className='flex items-center'>
                  <button
                    className='text-[#b01e1e] text-lg cursor-pointer focus:outline-none'
                    onClick={() => removeFromCart(index)}
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
            Total Price: {calculateTotal()}
          </h5>
          <button
            className='px-3 py-2 rounded-md bg-[#2cb1bc] hover:bg-[#14919b] text-[#fff] text-[14px] border-0'
            onClick={handlePurchase}
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
