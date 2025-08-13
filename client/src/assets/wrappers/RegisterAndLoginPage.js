import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
  .demo-section {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    border: 1px solid var(--grey-200);
  }
  .demo-text {
    margin: 0 0 0.75rem 0;
    font-size: 0.875rem;
    color: var(--text-secondary-color);
  }
  .demo-btn {
    background: var(--primary-600);
    color: var(--white);
    border: 1px solid var(--primary-600);
    transition: var(--transition);
  }
  .demo-btn:hover {
    background: var(--primary-700);
    border-color: var(--primary-700);
  }
`;
export default Wrapper;
