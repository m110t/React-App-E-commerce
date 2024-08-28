// import { useFormik } from 'formik';
// import React, { useState } from 'react';
// import axios from 'axios';

// export default function ShippingAddress() {
//   const [isLoading, setIsLoading] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       city: 'Dokki',
//       phone: '01284999951',
//       details: '6 tahrir street',
//     },
//     validate: validateData,
//     onSubmit: async ({values}, { setSubmitting, setErrors }) => {
//       setSubmitting(true);
//       setIsLoading(true);
//       console.log(values);
//       try {
//         const response = await axios.post('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66c59bdeed0dc0016cdc5398',{ShippingAddress:values}, {
//             headers:{
//                 token:localStorage.getItem("token")
//             },
//             params: {
//                 url:"http://localhost:3000"
//             }
//         });

//         formik.resetForm();
//       } catch (error) {
//         setErrors({ submit: error.response?.data?.message || 'An error occurred. Please try again.' });
//       } finally {
//         setSubmitting(false);
//         setIsLoading(false);
//       }
//     },
// });

//   function validateData(values) {
//     const errors = {};

//     if (!values.city.trim()) {
//       errors.city = 'City is required';
//     }

//     if (!values.phone.trim()) {
//       errors.phone = 'Phone is required';
//     }

//     return errors;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
//         <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
//           Add Your Shipping Address
//         </h1>
//         <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
//           <div className="flex items-start flex-col justify-start">
//             <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
//               City:
//             </label>
//             <input
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               type="text"
//               value={formik.values.city}
//               id="city"
//               name="city"
//               className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
//                 formik.errors.city && formik.touched.city ? 'border-red-500' : 'border-gray-300'
//               } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
//               aria-invalid={formik.touched.city && formik.errors.city ? 'true' : 'false'}
//             />
//             {formik.touched.city && formik.errors.city && (
//               <p className="text-red-500" aria-live="polite">
//                 {formik.errors.city}
//               </p>
//             )}
//           </div>

//           <div className="flex items-start flex-col justify-start">
//             <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
//               Phone:
//             </label>
//             <input
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               type="tel"
//               value={formik.values.phone}
//               id="phone"
//               name="phone"
//               className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
//                 formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'
//               } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
//               aria-invalid={formik.touched.phone && formik.errors.phone ? 'true' : 'false'}
//             />
//             {formik.touched.phone && formik.errors.phone && (
//               <p className="text-red-500" aria-live="polite">
//                 {formik.errors.phone}
//               </p>
//             )}
//           </div>

//           <div className="flex items-start flex-col justify-start">
//             <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
//               Details:
//             </label>
//             <input
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               type="text"
//               value={formik.values.details}
//               id="details"
//               name="details"
//               className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
//                 formik.errors.details && formik.touched.details ? 'border-red-500' : 'border-gray-300'
//               } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
//               aria-invalid={formik.touched.details && formik.errors.details ? 'true' : 'false'}
//             />
//             {formik.touched.details && formik.errors.details && (
//               <p className="text-red-500" aria-live="polite">
//                 {formik.errors.details}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={formik.isSubmitting || isLoading}
//             className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
//           >
//             {formik.isSubmitting || isLoading ? 'Checking out...' : 'Checkout'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useFormik } from 'formik';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function ShippingAddress() {
  const [isLoading, setIsLoading] = useState(false);
  const{cartid} =useParams()

  const formik = useFormik({
    initialValues: {
      city: 'Dokki',
      phone: '01284999951',
      details: '6 tahrir street',
    },
    validate: validateData,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      setIsLoading(true);
      console.log(values);
      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/'+ cartid,
          { ShippingAddress: values },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
            params: {
              url: 'http://localhost:5173',
            },
          }
        );

        formik.resetForm();
       window.open(response.data.session.url); // Move response logging here
      } catch (error) {
        setErrors({ submit: error.response?.data?.message || 'An error occurred. Please try again.' });
      } finally {
        setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  function validateData(values) {
    const errors = {};

    if (!values.city.trim()) {
      errors.city = 'City is required';
    }

    if (!values.phone.trim()) {
      errors.phone = 'Phone is required';
    }

    return errors;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
          Add Your Shipping Address
        </h1>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              City:
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.city}
              id="city"
              name="city"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.city && formik.touched.city ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              aria-invalid={formik.touched.city && formik.errors.city ? 'true' : 'false'}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500" aria-live="polite">
                {formik.errors.city}
              </p>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Phone:
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel"
              value={formik.values.phone}
              id="phone"
              name="phone"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              aria-invalid={formik.touched.phone && formik.errors.phone ? 'true' : 'false'}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500" aria-live="polite">
                {formik.errors.phone}
              </p>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">
              Details:
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.details}
              id="details"
              name="details"
              className={`w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border ${
                formik.errors.details && formik.touched.details ? 'border-red-500' : 'border-gray-300'
              } dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              aria-invalid={formik.touched.details && formik.errors.details ? 'true' : 'false'}
            />
            {formik.touched.details && formik.errors.details && (
              <p className="text-red-500" aria-live="polite">
                {formik.errors.details}
              </p>
            )}
          </div>
          <Helmet>
  <title>Shipping Address</title>
</Helmet>
          <button
            type="submit"
            disabled={formik.isSubmitting || isLoading}
            className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
          >
            {formik.isSubmitting || isLoading ? 'Checking out...' : 'Checkout'}
          </button>
        </form>
      </div>
    </div>
  );
}
