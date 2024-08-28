import { useFormik } from 'formik';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // Adjust path as needed
import { Helmet } from 'react-helmet';

export default function Login() {
  
  const navigate = useNavigate();
  const { setUserToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateData,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      setIsLoading(true);
      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
          email: values.email,
          password: values.password,
        });

        setUserToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        formik.resetForm();
        navigate('/'); // Navigate to home or the intended path after login
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ submit: error.response?.data?.message || 'An error occurred. Please try again.' });
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    }
  });

  function validateData(values) {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)) {
      errors.password = 'Minimum eight characters, at least one letter, one number, and one special character';
    }

    return errors;
  }

  return (
    <>
<Helmet>
  <title>login</title>
</Helmet>
<div className='min-h-screen flex items-center justify-center'>
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My FreshCart</h1>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              id="email"
              name="email"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {formik.touched.email && formik.errors.email && <p className='text-red-500'>{formik.errors.email}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              id="password"
              name="password"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.password && formik.touched.password ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {formik.touched.password && formik.errors.password && <p className='text-red-500'>{formik.errors.password}</p>}
          </div>

          {formik.errors.submit && <p className='text-red-500'>{formik.errors.submit}</p>}

          <button type="submit" disabled={formik.isSubmitting} className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center">
  <span className="text-sm text-gray-500 dark:text-gray-300">Forgot your password? </span>
  <Link to="/forgot-password" className="text-blue-500 hover:text-blue-600">Reset it here</Link>
</div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? </span>
          <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link>
        </div>
      </div>
    </div>
    </>
  );
}
