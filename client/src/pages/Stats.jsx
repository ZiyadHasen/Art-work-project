import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { StatItem } from '../components';

export const loader = async () => {
  const response = await customFetch.get('/users/stats');
  return response.data;
};

const Stats = () => {
  const { users, artworks } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefct'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total Artworks'
        count={artworks}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Stats; 