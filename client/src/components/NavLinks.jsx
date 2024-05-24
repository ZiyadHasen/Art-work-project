// import React from 'react';
// import { useDashboardContext } from '../pages/DashboardLayout';
// import links from '../utils/links';
// import { NavLink } from 'react-router-dom';

// const NavLinks = ({ isBigSidebar }) => {
//   const { toggleSidebar, user } = useDashboardContext();
//   // console.log(user);
//   return (
//     <div className='nav-links'>
//       {links.map((link) => {
//         const { text, path, icon } = link;
//         const { role } = user;
//         const { name } = user;

//         if (name !== 'test') {
//           // Modify links array to filter out 'my Works' link
//           const filteredLinks = links.filter(
//             (link) => link.text !== 'my Works'
//           );
//           // Now use filteredLinks in your code where you render the navigation links
//         }
//         if (role !== 'admin' && path === 'admin') return;
//         return (
//           <NavLink
//             to={path}
//             key={text}
//             className='nav-link'
//             onClick={isBigSidebar ? null : toggleSidebar}
//             // will discuss in a second
//             end //this will remove the active class from add job
//           >
//             <span className='icon'>{icon}</span>
//             {text}
//           </NavLink>
//         );
//       })}
//     </div>
//   );
// };

// export default NavLinks;

import { useDashboardContext } from '../pages/DashboardLayout';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        const { name } = user;
        if (path === 'my-artworks' && name === 'test') return;
        if (path === 'admin' && role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
