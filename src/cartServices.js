import axios from "axios";
import { Bounce, toast } from 'react-toastify';
export async function addProductToCart(productId,userToken) {
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", 
        { productId },
        { headers: { token: userToken } }
      );
      console.log(data);
      toast.success(data.message
        , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error('🚨 Failed to add product to cart.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }