import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { NameContext } from "../../contexts/NameContext";

export default function EnterNewPassword() {
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(NameContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid e-mail")
      .required("Email is required"),
    newPassword: Yup.string().required("Password is required"),
  });
  async function changePassword(values) {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      localStorage.setItem("userToken", data.token);
      setUserData(data.token); // Ensure setUserData correctly updates state
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: changePassword,
  });

  return (
    <div className="md:w-1/2 mx-auto my-8 py-7">
      <h3 className="text-3xl font-semibold mb-4">
        Reset Your Account Password
      </h3>
      <form className="mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative my-6 group">
          <label
            htmlFor="email"
            className="peer-focus:font-medium  text-xl font-bold  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4"
          >
            User Email
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
            aria-describedby="email-error"
          />
          {formik.errors.email && formik.touched.email && (
            <div
              id="email-error"
              className="p-4 mt-2 text-sm text-red-800 rounded-lg  dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="relative my-6 group">
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium  text-xl font-bold  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 dark:text-gray-900 dark:bg-gray-900 py-2 rounded-md border"
            placeholder=" "
            aria-describedby="password-error"
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <div
              id="password-error"
              className="p-4 mt-2 text-sm text-red-800 rounded-lg  dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.newPassword}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
          disabled={loading}
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin-pulse"></i>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
