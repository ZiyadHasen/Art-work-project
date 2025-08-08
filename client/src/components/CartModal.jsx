import  { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import customFetch from '../utils/customFetch';

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
      const response = await customFetch.post('/create-checkout-session', {
        items: cartItems,
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
    <div 
      className='fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-[99999] p-4'
      onClick={handleClose}
    >
      <div 
        className='bg-white w-full max-w-2xl mx-auto rounded-xl shadow-2xl border border-gray-200 overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200 bg-[#2cb1bc] text-white'>
          <h2 className='text-xl font-semibold'>
            🛒 Cart Summary
          </h2>
          <button
            onClick={handleClose}
            className='text-white hover:text-gray-200 cursor-pointer text-2xl transition-colors duration-200 p-1 rounded-full hover:bg-white hover:bg-opacity-20'
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 max-h-96 overflow-y-auto'>
          {cartItems.length === 0 ? (
            <div className='text-center py-8'>
              <div className='text-6xl mb-4'>🛍️</div>
              <p className='text-gray-500 text-lg'>Your cart is empty</p>
              <p className='text-gray-400 text-sm mt-2'>Add some beautiful artworks to get started!</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200'
                >
                  <div className='flex-1'>
                    <h5 className='text-lg font-semibold text-gray-800 mb-1'>
                      {item.artwork.title}
                    </h5>
                    <p className='text-gray-600 font-medium'>
                      {Number(item.artwork.price).toLocaleString()} birr
                    </p>
                  </div>
                  <button
                    className='ml-4 text-red-500 hover:text-red-700 cursor-pointer text-xl transition-colors duration-200 p-2 rounded-full hover:bg-red-50'
                    onClick={() => removeFromCart(index)}
                    title='Remove from cart'
                  >
                    <MdClose />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className='p-6 border-t border-gray-200 bg-gray-50'>
            <div className='flex justify-between items-center mb-4'>
              <h5 className='text-xl font-bold text-gray-800'>
                Total: {calculateTotal()}
              </h5>
            </div>
            <button
              className='w-full py-3 px-4 rounded-lg bg-[#2cb1bc] hover:bg-[#14919b] text-white font-semibold text-lg border-0'
              onClick={handlePurchase}
            >
              💳 Purchase Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
