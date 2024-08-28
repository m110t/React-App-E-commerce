import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import LoadingScreen from '../../components/loading/LoadingScreen';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCart(data);
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Error fetching cart data', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId) => {
    setLoading(true);
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token: localStorage.getItem('token') },
      });
      fetchCart();
      toast.success('Product removed from cart', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Error removing product from cart', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  async function clearcart(){
    let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers: { token: localStorage.getItem("token") },
    })
    setCart(null);
  }

  
  const updateProductCount = async (productId, count) => {
    setLoadingProductId(productId);
    try {
      if (count === "" || count <= 0) {
        await removeProduct(productId);
      } else {
        const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, {
          headers: { token: localStorage.getItem("token") },
        });
           console.log("Cart ID:", data.data._id)
        setCart(data);
        toast.success('Product count updated', {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error('Error updating product count', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoadingProductId(null);
    }
  };
if(loading) {
  return <i className='fas fa-spinner fa-spin text-6xl'></i>
}
  return (
    cart?<div className="pt-20">
      <ToastContainer />
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart?.data.products.map(product => (
              <div key={product.product._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={product.product.imageCover} className="w-full rounded-lg sm:w-40" alt={product.product.title} />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
                    <p className="mt-1 text-xs text-gray-700">${product.price}</p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button
                        disabled={product.count === 1 || loadingProductId === product.product._id}
                        onClick={() => updateProductCount(product.product._id, product.count - 1)}
                        className="cursor-pointer disabled:cursor-not-allowed rounded-l disabled:hover:bg-gray-100 disabled:hover:text-black bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        {loadingProductId === product.product._id ? <i className='fa fa-spinner fa-spin'></i> : "-"}
                      </button>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={product.count}
                        min="1"
                        onChange={(e) => updateProductCount(product.product._id, e.target.value)}
                      />
                      <button
                        disabled={loadingProductId === product.product._id}
                        onClick={() => updateProductCount(product.product._id, product.count + 1)}
                        className="cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        {loadingProductId === product.product._id ? <i className='fa fa-spinner fa-spin'></i> : "+"}
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">${product.price * product.count}</p>
                      <svg
                        onClick={() => removeProduct(product.product._id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Helmet>
  <title>Cart</title>
</Helmet>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">${cart?.data.totalCartPrice}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$0</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <Link to={`/shippingadress/${cart?.data._id}`}className="mt-6 block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>  
            </div>
        </div>
      )}
      <button onClick={()=>clearcart()} className='text-red-500 border-2 border-red-500 rounded-md p-4 px-4 py-2 hover:text-white hover:bg-red-500'>Clear Cart</button>
    </div> : <h1 className='text-center font-bold text-4xl'>No Products In Your Cart </h1>
  );
}
