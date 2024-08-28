import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../loading/LoadingScreen';
import Slider from "react-slick";
import RelatedProducts from '../realatedProducts/RelatedProducts';
import { addProductToCart } from '../../cartServices';
import { AuthContext } from '../../contexts/AuthContext';



export default function ProductDetails() {
  const { id } = useParams();
  console.log(id);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const {userToken} = useContext(AuthContext)
const [isLoading, setIsLoading] = useState(true)
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
  useEffect(() => {
    getDetails();
  }, [id]);

  async function getDetails() {
    setIsLoading(true)
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProductDetails(data.data);
    getRelatedProducts(data.data?.category._id)
    setIsLoading(false)
  // Show loading state while fetching data
  }
  async function getRelatedProducts(categoryId) {
    
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
    
    params: {"category": categoryId} 
  })
  // Show loading state while fetching data
setrelatedProducts(data.data);
}



  return (
    <>
    {
isLoading? <LoadingScreen/>
:
<div className="bg-white">
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-3/12 lg:h-96">
              {/* <img className="h-full rounded-md object-contain max-w-lg mx-auto" src={productDetails?.imageCover} alt={productDetails?.title} /> */}
              <Slider {...settings}>
     {productDetails?.images.map((img)=>{
                  return  <img className="w-9/12 rounded-md object-contain max-w-lg mx-auto" src={img}  />

     })}
    </Slider>

            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <div className='flex-col justify-start'>
                <h3 className="text-gray-700 uppercase text-lg font-bold text-left">{productDetails?.title}</h3>
                <span className="text-green-500 text-left block">${productDetails?.price}</span>
              </div>
              <hr className="my-3" />
              <label className="text-gray-700 text-sm flex justify-start" htmlFor="rating">Rating:</label>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <svg
                    key={rate}
                    className={productDetails?.ratingsAverage >= rate ? "w-5 h-5 text-yellow-300" : "w-5 h-5 text-gray-300"}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{productDetails?.ratingsAverage}</span>
              </div>
              <br />
              <label className="text-gray-700 text-sm flex justify-start" htmlFor="category">Category:</label>
              <div className="flex items-center mt-1">
                <h1>{productDetails?.category.name}</h1>
              </div>
              <br />
              <label className="text-gray-700 text-sm flex justify-start" htmlFor="description">Description:</label>
              <div className="flex items-center mt-1">
                <h1>{productDetails?.description}</h1>
              </div>
              <br />
              <label className="text-gray-700 text-sm flex justify-start" htmlFor="subcategory">SubCategory:</label>
              <div className="flex items-center mt-1">
                <h1>{productDetails?.subcategory[0].name}</h1>
              </div>
              <br />
              <label className="text-gray-700 text-sm flex justify-start" htmlFor="brand">Brand:</label>
              <div className="flex items-center mt-1">
                <h1>{productDetails?.brand.name}</h1>
              </div>
              <div className="flex items-center mt-6">
                <button onClick={() => addProductToCart(productDetails._id,userToken)} className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</button>
                <button onClick={() => addProductToCart(productDetails._id,userToken)} className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                  <svg  className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <RelatedProducts products={relatedProducts}/>
        </div>
      </main>
    </div>

    }
    
    </>
  );
}