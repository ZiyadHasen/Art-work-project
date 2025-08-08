import styled from 'styled-components';

const Wrapper = styled.article`
  background: white;
  border-radius: 16px;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .artwork-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  .artwork-title {
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #1e293b;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  .artwork-description-container {
    cursor: pointer;
    margin-top: 0.5rem;
  }
  
  .artwork-description {
    color: #64748b;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    transition: all 0.3s ease;
  }
  
  .artwork-description.truncated {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .artwork-description.expanded {
    display: block;
  }
  
  .read-more {
    color: #2cb1bc;
    font-size: 12px;
    font-weight: 500;
    margin-top: 0.25rem;
    display: block;
    text-decoration: underline;
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
    padding: 1.5rem;
  }
  .content-center {
    display: grid;
    margin: 1rem 0;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    align-items: center;
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
