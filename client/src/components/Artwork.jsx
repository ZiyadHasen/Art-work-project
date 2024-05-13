import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Artwork';
import ArtworkInfo from './ArtworkInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Artwork = ({
  _id,
  position,
  company,
  artworkLocation,
  artworkType,
  createdAt,
}) => {
  const date = day(createdAt).format('MMM Do,YYY');
  // console.log(artworkStatus);
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ArtworkInfo icon={<FaLocationArrow />} text={artworkLocation} />
          <ArtworkInfo icon={<FaCalendarAlt />} text={date} />
          <ArtworkInfo icon={<FaBriefcase />} text={artworkType} />
        </div>

        <footer className='actions'>
          <Link className='btn edit-btn' to={`../edit-artwork/${_id}`}>
            Edit
          </Link>
          <Form method='post' action={`../delete-artwork/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Artwork;
