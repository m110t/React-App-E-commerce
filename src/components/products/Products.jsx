import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import { ToastContainer } from 'react-toastify';
import { addProductToCart } from '../../cartServices';
import { Helmet } from 'react-helmet';
export default function Home() {

const [products, setProducts] = useState([])
const {userToken} = useContext(AuthContext)
const{loadin,setloading}=useState(null)
useEffect(()=>{
  getProduct()
  
},[])

async function getProduct() {
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  setProducts(data.data);
}



return (
  <>
          <Helmet>
  <title>Home</title>
</Helmet>
    <ToastContainer />
    <div className='grid grid-cols-4 gap-3'>
      {products.map((product) => (
        <div key={product._id} className="max-w-2xl mx-auto">
          <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/productDetails/${product._id}`}>
              <img className="rounded-t-lg p-8" src={product.imageCover} alt="product image" />
            </Link>
            <div className="px-5 pb-5">
              <Link to={`/productDetails/${product._id}`}>
                <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}</h3>
              </Link>
              <p className='line-clamp-3'>{product.description}</p>
              <div className="flex items-center mt-2.5 mb-5">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <svg key={rate} className={product.ratingsAverage >= rate ? "w-5 h-5 text-yellow-300" : "w-5 h-5 text-gray-300"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{product.ratingsAverage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                <button onClick={() => addProductToCart(product._id,userToken)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
);
}