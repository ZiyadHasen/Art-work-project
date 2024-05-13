import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>ohh! page not found</h3>
          <p>we cant seem to find the page you are looking for</p>

          <Link to='/dashboard'>bakc home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h3>somthing went wrong</h3>
    </Wrapper>
  );
};

export default Error;
