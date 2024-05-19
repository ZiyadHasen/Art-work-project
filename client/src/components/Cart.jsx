import React from 'react';

function Cart() {
  return (
    <div>
      {' '}
      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Hello!</h3>
          <p className='py-4'>
            Press ESC key or click the button below to close
          </p>
          <h2 className='text-red-700'>Cart Items will be added here</h2>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Cart;
