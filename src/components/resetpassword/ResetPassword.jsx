import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^[0-9]{6}$/, "Reset code must be a 6-digit number"), // Adjust validation if necessary
  });

  async function resetPassword(values) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: values.resetCode,
        }
      );
      navigate("/enternewpassword");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <div className="md:w-1/2 mx-auto my-8 py-7">
      <h3 className="text-3xl font-semibold mb-4">
        Please enter the Reset Code
      </h3>
      <form className="mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative my-6 group">
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium  text-xl font-bold  duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 "          >
            Reset Code
          </label>
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-3 mt-2 dark:text-gray-900 dark:bg-gray-900 py-2 rounded-md border"
            placeholder=" "
            aria-describedby="resetCode-error"
          />
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div
              id="resetCode-error"
              className="p-4 mt-4 mb-4 text-sm text-red-800 rounded-lg  dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.resetCode}
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
