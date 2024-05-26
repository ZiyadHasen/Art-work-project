import { FormRow, FormRowSelect, SubmitBtn } from './';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, Link, useSubmit } from 'react-router-dom';
// import { useAllArtworksContext } from '../pages/AllArtworks';
import { ARTWORK_SORT_BY } from '../../../utils/constants';
import { useAllArtworksContext } from '../pages/AllArtworks';

const SearchContainer = () => {
  const { searchValues } = useAllArtworksContext();
  const { search, location, sort } = searchValues;
  // console.log(search);
  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='search'
            name='search'
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRow
            type='location'
            name='location'
            defaultValue={location}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(ARTWORK_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <Link
            to='/dashboard/all-artworks'
            className='btn bg-[#2cb1bc] disabled:bg-[#14919b] disabled:text-[#fff] hover:bg-[#14919b] text-[#fff] text-[16px] btn-block form-btn border-0 '
          >
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          {/* <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
