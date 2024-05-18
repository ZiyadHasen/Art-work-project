import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .artwork-image {
    width: 100%;
    height: 350px;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }
  .artwork-title {
    font-size: 1.6rem;
    text-transform: capitalize;
    color: var(--primary-600);
  }
  .artwork-description {
    color: var(--grey-400);
    font-size: 16px;
    /* color: var(--primary-500); */
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 0 1.5rem 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-top: 4px;
    margin-bottom: 1.2rem;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .actions {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
  }

  .edit-btn,
  .delete-btn {
    height: 35px;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
