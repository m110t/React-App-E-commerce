import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { addProductToCart } from '../../cartServices';
import { AuthContext } from '../../contexts/AuthContext';

export default function RelatedProducts({ products }) {
  const { userToken } = useContext(AuthContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (!products || products.length === 0) {
    return <p className="text-gray-600 text-center">No related products found.</p>;
  }

  return (
    <div className="mt-16">
      <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="w-full max-w-sm mx-auto rounded-md p-2 overflow-hidden">
            <div
              className="flex items-end justify-end h-56 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${product.imageCover})` }}
            >
              <button
                onClick={() => addProductToCart(product._id, userToken)}
                className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button>
            </div>
            <div className="px-5 py-3">
              <Link to={`/ProductDetails/${product._id}`} className="text-gray-700 uppercase hover:text-blue-600">
                {product.title}
              </Link>
              <span className="text-gray-500 mt-2">${product.price}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
