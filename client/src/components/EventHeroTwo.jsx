import React from 'react';
import ImageTwo from '../assets/images/imageTwo.jpg';

const EventHeroTwo = () => {
  return (
    <>
      <div className=' flex justify-center items-center p-20'>
        <div className='flex gap-10'>
          <img
            src={ImageTwo}
            className='max-w-sm flex-1 h-[25rem] rounded-lg shadow-2xl'
          />
          <div>
            <h1 className='text-5xl font-bold'>Box Office News!</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Earum eveniet modi aut quo quidem cumque temporibus
              laudantium ut aliquam nisi?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventHeroTwo;
