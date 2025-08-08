import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

day.extend(advancedFormat);

const Event = ({
  title,
  description,
  date,
  time,
  location,
  image,
  organizer,
  capacity,
  price,
  category,
}) => {
  const formattedDate = day(date).format('MMM Do, YYYY');
  
  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300'>
      {/* Event Image */}
      <div className='relative h-48 overflow-hidden'>
        <img 
          src={image} 
          alt={title} 
          className='w-full h-full object-cover'
        />
        <div className='absolute top-4 left-4'>
          <span className='bg-[#2cb1bc] text-white px-3 py-1 rounded-full text-sm font-medium'>
            {category}
          </span>
        </div>
        {price && (
          <div className='absolute top-4 right-4'>
            <span className='bg-white text-[#2cb1bc] px-3 py-1 rounded-full text-sm font-bold shadow-md'>
              {price} birr
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className='p-6'>
        <h3 className='text-xl font-bold text-gray-800 mb-2'>{title}</h3>
        <p className='text-gray-600 mb-4 line-clamp-2'>{description}</p>
        
        {/* Event Details */}
        <div className='space-y-2 mb-4'>
          <div className='flex items-center text-gray-600'>
            <FaCalendarAlt className='mr-2 text-[#2cb1bc]' />
            <span>{formattedDate}</span>
          </div>
          <div className='flex items-center text-gray-600'>
            <FaClock className='mr-2 text-[#2cb1bc]' />
            <span>{time}</span>
          </div>
          <div className='flex items-center text-gray-600'>
            <FaMapMarkerAlt className='mr-2 text-[#2cb1bc]' />
            <span>{location}</span>
          </div>
          <div className='flex items-center text-gray-600'>
            <FaUsers className='mr-2 text-[#2cb1bc]' />
            <span>Organized by {organizer}</span>
          </div>
          {capacity && (
            <div className='flex items-center text-gray-600'>
              <FaUsers className='mr-2 text-[#2cb1bc]' />
              <span>Capacity: {capacity} people</span>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default Event; 