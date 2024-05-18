import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import CartModal from './CartModel';
import { useState } from 'react';
day.extend(advancedFormat);

const Artwork = ({
  _id,
  title,
  location,
  price,
  description,
  createdAt,
  createdByName,
  avatar,
}) => {
  const date = day(createdAt).format('MMM Do,YYY');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Wrapper>
      <img src={avatar} alt='artwork image' className='artwork-image ' />
      <div className='content'>
        <div className='collapse'>
          <input type='checkbox' />
          <div className='collapse-title artwork-title'>{title}</div>
          <div className='collapse-content'>
            <p className='artwork-description'>{description}</p>
          </div>
        </div>
        <div className='content-center'>
          <ArtworkInfo icon={<FaLocationArrow />} text={location} />
          <ArtworkInfo icon={<FaCalendarAlt />} text={date} />
          <ArtworkInfo icon={<BsCurrencyDollar />} text={price} isbirr />
          <ArtworkInfo icon={<FaUser />} text={createdByName} />
        </div>
        <div className='footer-container'>
          <footer className='actions'>
            <Link className='button edit-btn' to={`../edit-artwork/${_id}`}>
              Edit
            </Link>
            <Form method='post' action={`../delete-artwork/${_id}`}>
              <button type='submit' className='button delete-btn'>
                Delete
              </button>
            </Form>
          </footer>
          {/* <Link className='btn add-cart-btn' to={`../edit-artwork/${_id}`}>
            Add to Cart
          </Link> */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className='px-4 py-3 rounded-md bg-[#2cb1bc] hover:bg-[#14919b] text-[#fff] text-[16px]  border-0'
            onClick={() => document.getElementById('my_modal_5').showModal()}
          >
            Add To Cart
          </button>
          <dialog
            id='my_modal_5'
            className='modal modal-bottom sm:modal-middle'
          >
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

          {isCartOpen && <CartModal onClose={closeCart} />}
        </div>
      </div>
    </Wrapper>
  );
};
export default Artwork;
