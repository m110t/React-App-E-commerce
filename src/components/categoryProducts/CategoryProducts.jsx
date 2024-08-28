// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import LoadingScreen from '../loading/LoadingScreen';
// import Slider from 'react-slick';
// import RelatedProducts from '../relatedProducts/RelatedProducts';
// import { addProductToCart } from '../../cartServices';
// import { AuthContext } from '../../contexts/AuthContext';

// const useProductDetails = (productId) => {
//   const [productDetails, setProductDetails] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setIsLoading(true);
//       try {
//         const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/products/${productId}`);
//         setProductDetails(data.data);
//         await fetchRelatedProducts(data.data?.category._id);
//       } catch (err) {
//         if (err.response && err.response.status === 404) {
//           setError("Product not found. Please check the product ID or try again later.");
//         } else {
//           setError("An error occurred while fetching product details.");
//         }
//         console.error("Error fetching product details:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchRelatedProducts = async (categoryId) => {
//       try {
//         const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
//           params: { category: categoryId }
//         });
//         setRelatedProducts(data.data);
//       } catch (err) {
//         setError("An error occurred while fetching related products.");
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   return { productDetails, relatedProducts, isLoading, error };
// };

// export default function ProductDetails() {
//   const { id } = useParams();
//   const { userToken } = useContext(AuthContext);

//   const { productDetails, relatedProducts, isLoading, error } = useProductDetails(id);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (error) {
//     return <div className="text-red-500 p-4">{error}</div>;
//   }

//   return (
//     <div className="bg-white">
//       <main className="my-8">
//         <div className="container mx-auto px-6">
//           <div className="md:flex md:items-center">
//             <div className="w-full h-64 md:w-3/12 lg:h-96">
//               <Slider {...sliderSettings}>
//                 {productDetails?.images.map((img, index) => (
//                   <img
//                     key={index}
//                     className="w-full h-full rounded-md object-cover"
//                     src={img}
//                     alt={`Product Image ${index + 1}`}
//                   />
//                 ))}
//               </Slider>
//             </div>
//             <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
//               <div className="flex flex-col">
//                 <h3 className="text-gray-700 uppercase text-lg font-bold">{productDetails?.title}</h3>
//                 <span className="text-green-500 block">${productDetails?.price}</span>
//               </div>
//               <hr className="my-3" />
//               <div className="flex flex-col mb-4">
//                 <label className="text-gray-700 text-sm" htmlFor="rating">Rating:</label>
//                 <div className="flex items-center mt-1">
//                   {[1, 2, 3, 4, 5].map((rate) => (
//                     <svg
//                       key={rate}
//                       className={productDetails?.ratingsAverage >= rate ? "w-5 h-5 text-yellow-300" : "w-5 h-5 text-gray-300"}
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                     </svg>
//                   ))}
//                   <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-3 px-2.5 py-0.5 rounded">
//                     {productDetails?.ratingsAverage}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label className="text-gray-700 text-sm" htmlFor="category">Category:</label>
//                 <h1>{productDetails?.category.name}</h1>
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label className="text-gray-700 text-sm" htmlFor="description">Description:</label>
//                 <h1>{productDetails?.description}</h1>
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label className="text-gray-700 text-sm" htmlFor="subcategory">SubCategory:</label>
//                 <h1>{productDetails?.subcategory[0].name}</h1>
//               </div>
//               <div className="flex flex-col mb-4">
//                 <label className="text-gray-700 text-sm" htmlFor="brand">Brand:</label>
//                 <h1>{productDetails?.brand.name}</h1>
//               </div>
//               <div className="flex items-center mt-6">
//                 <button
//                   onClick={() => addProductToCart(productDetails._id, userToken)}
//                   className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
//                 >
//                   Order Now
//                 </button>
//                 <button
//                   onClick={() => addProductToCart(productDetails._id, userToken)}
//                   className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none"
//                 >
//                   <svg
//                     className="h-5 w-5"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//           <RelatedProducts products={relatedProducts} />
//         </div>
//       </main>
//     </div>
//   );
// }
