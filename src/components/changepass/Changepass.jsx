import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const ChangePasswordForm = ({ baseUrl }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.currentPassword) {
        errors.currentPassword = 'Current password is required';
      }
      if (!values.newPassword) {
        errors.newPassword = 'New password is required';
      } else if (values.newPassword.length < 6) {
        errors.newPassword = 'New password must be at least 6 characters long';
      }
      if (values.newPassword !== values.confirmNewPassword) {
        errors.confirmNewPassword = 'New passwords must match';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setSuccessMessage('');
      setError('');

      try {
        const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        if (response.status === 200) {
          setSuccessMessage('Password successfully changed.');
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
        <label htmlFor="currentPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
            formik.errors.currentPassword ? 'border-red-500' : 'border-gray-300'
          } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {formik.touched.currentPassword && formik.errors.currentPassword && <p className='text-red-500'>{formik.errors.currentPassword}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="newPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
            formik.errors.newPassword ? 'border-red-500' : 'border-gray-300'
          } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {formik.touched.newPassword && formik.errors.newPassword && <p className='text-red-500'>{formik.errors.newPassword}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="confirmNewPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm New Password:</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
            formik.errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
          } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && <p className='text-red-500'>{formik.errors.confirmNewPassword}</p>}
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {successMessage && <p className='text-green-500'>{successMessage}</p>}

      <button type="submit" disabled={formik.isSubmitting} className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
        {formik.isSubmitting ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  );
};

ChangePasswordForm.propTypes = {
  baseUrl: PropTypes.string.isRequired,
};

export default ChangePasswordForm;
