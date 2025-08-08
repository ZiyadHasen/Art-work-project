import { TiGroupOutline } from 'react-icons/ti';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { BsPersonLinesFill } from 'react-icons/bs';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaPalette } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';

const links = [
  {
    text: 'add artwork',
    path: '.', //this links are relative consider we are in dashboard and then add the next rout
    icon: <FaWpforms />,
  },
  { text: 'all artworks', path: 'all-artworks', icon: <MdQueryStats /> },
  { text: 'my Works', path: 'my-artworks', icon: <FaPalette /> },
  { text: 'events', path: 'events', icon: <TiGroupOutline /> },
  { text: 'profile', path: 'profile', icon: <BsPersonLinesFill /> },
  { text: 'stats', path: 'stats', icon: <FaChartBar /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;
