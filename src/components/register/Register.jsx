import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState(""); // For success and error messages
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: async (values, { setErrors }) => {
      console.log('Form Submitted with values:', values); // Debug form values

      setFormMessage("");

      // Check if passwords match
      if (values.password !== values.rePassword) {
        setErrors({ rePassword: 'Passwords must match' });
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', {
          name: values.name,
          email: values.email,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone,
        });

        console.log('API Response:', response.data); // Debug API response
        setFormMessage("Registration successful!");
        formik.resetForm();
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } catch (error) {
        if (error.response) {
          console.error('Server responded with error:', error.response.data);
          setFormMessage(error.response.data.errors?.msg || 'Registration failed. Please try again.');
        } else if (error.request) {
          console.error('No response received:', error.request);
          setFormMessage('No response from the server. Please try again.');
        } else {
          console.error('Error setting up request:', error.message);
          setFormMessage('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    validate: validateData
  });

  function validateData(values) {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } else if (values.name.length < 2) {
      errors.name = 'Name must be more than 2 characters';
    } else if (values.name.length > 20) {
      errors.name = 'Name must be less than 20 characters';
    }

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

    if (!values.rePassword.trim()) {
      errors.rePassword = 'Confirm Password is required';
    } else if (values.rePassword !== values.password) {
      errors.rePassword = 'Passwords must match';
    }

    if (!values.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{11}$/.test(values.phone)) {
      errors.phone = 'Phone number must be 11 digits';
    }

    console.log('Validation errors:', errors); // Debug validation errors
    return errors;
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My FreshCart</h1>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
          {formMessage && <p className={`text-${formMessage.includes('successful') ? 'green' : 'red'}-500 mb-4`}>{formMessage}</p>}
          <Helmet>
  <title>Register</title>
</Helmet>
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              id="name"
              name="name"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {formik.touched.name && formik.errors.name && <p className='text-red-500'>{formik.errors.name}</p>}
          </div>

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

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="rePassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.rePassword}
              id="rePassword"
              name="rePassword"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.rePassword && formik.touched.rePassword ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {formik.touched.rePassword && formik.errors.rePassword && <p className='text-red-500'>{formik.errors.rePassword}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.phone}
              id="phone"
              name="phone"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {formik.touched.phone && formik.errors.phone && <p className='text-red-500'>{formik.errors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="disabled:bg-gray-400 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i> Register...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
