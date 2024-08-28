import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  async function forgetPassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: values.email,
        }
      );
      
      navigate("/resetpassword");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });
  return (
    <div className="md:w-1/2 mx-auto my-8 py-7">
      <h3 className="text-3xl font-semibold mb-4">Please enter your Email</h3>
      <form className="mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative   my-6 group">
          <label
            htmlFor="email"
            className="peer-focus:font-medium  text-xl font-bold  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 "
          >
            User e-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 dark:text-gray-900 dark:bg-gray-900 py-2 rounded-md border"
            placeholder=" "
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg  dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}

        {loading ? (
          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}