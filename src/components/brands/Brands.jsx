import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import '../../index.css'; // Import the CSS file for styling

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    async function getCategories() {
      try {
        let response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getCategories();
  }, []);

  if (loading) {
    return <i className='fas fa-spinner fa-spin text-6xl'></i>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <ToastContainer />
      <div className='category-grid'>
        {brands.map((brand) => (
          <div key={brand._id} className="category-card">
            <Link to={`/productDetails/${brand._id}`}>
              <img className="category-image" src={brand.image} alt={brand.name} />
            </Link>
            <div className="category-content">
              <Link to={`/productDetails/${brand._id}`}>
                <h3 className="category-title">{brand.name}</h3>
              </Link>
              <div className="category-actions">
                {/* Add more content here if needed */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
