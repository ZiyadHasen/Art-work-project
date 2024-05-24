import { useNavigation } from 'react-router-dom';
const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type='submit'
      className={`btn bg-[#2cb1bc] disabled:bg-[#14919b] disabled:text-[#fff] hover:bg-[#14919b] text-[#fff] text-[16px] btn-block form-btn border-0 ${
        formBtn && 'form-btn'
      } `}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting' : 'submit'}
    </button>
  );
};
export default SubmitBtn;
