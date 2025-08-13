import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  const isDemoUser = user.role === 'demo';
  
  return (
    <Wrapper>
      <button
        type='button'
        className='button logout-btn'
        onClick={() => {
          setShowLogout(!showLogout);
        }}
      >
        {user.avatar ? (
          <img src={user.avatar} alt='avatar' className='img' />
        ) : (
          <FaUserCircle />
        )}

        <span className={isDemoUser ? 'demo-user-name' : ''}>
          {user?.name}
          {isDemoUser && <span className='demo-badge'>DEMO</span>}
        </span>
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' onClick={logoutUser} className='dropdown-btn'>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
