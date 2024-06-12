import { FaLocationArrow, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);

const ArtworkMy = ({
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
        </div>
      </div>
    </Wrapper>
  );
};
export default ArtworkMy;
