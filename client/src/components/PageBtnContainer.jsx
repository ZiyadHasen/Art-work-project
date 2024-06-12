import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllArtworksContext } from '../pages/AllArtworks';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllArtworksContext();

  // console.log(numOfPages, currentPage);
  // console.log(data);
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  // This creates an array [1, 2, 3, 4, 5, 6, 7, 8]:
  // The first argument { length: numOfPages } creates an array-like object with 'numOfPages' undefined values.
  // The second argument is a function that takes two parameters: _ (the current value, which is undefined) and index (the current index).
  // The function rewrites each value in the array, replacing undefined with index + 1.
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className='button prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className=''>
        {pages.map((pageNumber) => (
          <button
            className={`button page-btn mx-1 ${
              pageNumber === currentPage ? 'active' : ''
            }`}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className='button next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
