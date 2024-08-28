import React, { useState } from 'react';  
import axios from 'axios';  
import { useFormik } from 'formik';  
import PropTypes from 'prop-types';  

const VerifyResetCode = ({ email }) => {  
  const [successMessage, setSuccessMessage] = useState('');  
  const [error, setError] = useState('');  

  const formik = useFormik({  
    initialValues: {  
      resetCode: '',  
    },  
    validate: (values) => {  
      const errors = {};  
      if (!values.resetCode) {  
        errors.resetCode = 'Reset code is required';  
      }  
      return errors;  
    },  
    onSubmit: async (values, { setSubmitting }) => {  
      setSubmitting(true);  
      setSuccessMessage('');  
      setError('');  

      try {  
        // Ensure the correct endpoint URL for verifying the reset code  
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {  
          email,  
          resetCode: values.resetCode,  
        });  

        if (response.status === 200) {  
          setSuccessMessage('Reset code verified successfully. You can now reset your password.');  
          // Here you might want to navigate to the next step (e.g., reset password form)  
        } else {  
          setError(response.data.message || 'Unexpected response from server.');  
        }  
      } catch (err) {  
        setError(err.response?.data?.message || 'An error occurred. Please try again.');  
      } finally {  
        setSubmitting(false);  
      }  
    },  
  });  

  return (  
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">  
      <div className="flex items-start flex-col justify-start">  
        <label htmlFor="resetCode" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Reset Code:</label>  
        <input  
          type="text"  
          id="resetCode"  
          name="resetCode"  
          value={formik.values.resetCode}  
          onChange={formik.handleChange}  
          onBlur={formik.handleBlur}  
          className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${  
            formik.errors.resetCode ? 'border-red-500' : 'border-gray-300'  
          } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}  
        />  
        {formik.touched.resetCode && formik.errors.resetCode && <p className='text-red-500'>{formik.errors.resetCode}</p>}  
      </div>  

      {error && <p className='text-red-500'>{error}</p>}  
      {successMessage && <p className='text-green-500'>{successMessage}</p>}  

      <button type="submit" disabled={formik.isSubmitting} className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">  
        {formik.isSubmitting ? 'Verifying...' : 'Verify Reset Code'}  
      </button>  
    </form>  
  );  
};  

VerifyResetCode.propTypes = {  
  email: PropTypes.string.isRequired,  
};  

export default VerifyResetCode;