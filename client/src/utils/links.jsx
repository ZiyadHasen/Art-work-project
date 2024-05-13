import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  {
    text: 'add artwork',
    path: '.', //this links are relative consider we are in dashboard and then add the next rout
    icon: <FaWpforms />,
  },
  { text: 'all artworks', path: 'all-artworks', icon: <MdQueryStats /> },
  { text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'profile', path: 'profile', icon: <ImProfile /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;
