import React from 'react';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';

import { Link } from 'react-router-dom';
import { Logo } from '../components';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Ethio <span>Art</span> gallery
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            recusandae corrupti obcaecati magnam accusantium ea. Autem unde
            voluptatum! Placeat dicta est unde sed fuga assumenda error
            perferendis dignissimos facilis.
          </p>
          <Link to='/register' className='button register-link'>
            Register
          </Link>
          <Link to='/login' className='button'>
            Login /Demo
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
