import Wrapper from '../assets/wrappers/ArtworkInfo';

const JobInfo = ({ icon, text, isbirr }) => {
  return (
    <Wrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>
        {text}
        {isbirr ? ' birr' : ''}
      </span>
    </Wrapper>
  );
};

export default JobInfo;
