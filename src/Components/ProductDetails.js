import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../Products.json";
import "./ProductDetails.css";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const product = Products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return (
      <div>
        <h2>Product not found!</h2>;
      </div>
    );
  }

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <>
      <div className="cart">
        <FaShoppingCart />
        <span className="cart-cout">{cart.length}</span>
      </div>

      <div className="product-details">

        <div className="product-content">
          <img src={product.image} alt={product.name} className="details-img" />
        </div>

        <div className="product-information">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>

      </div>
    </>
  );
};

export default ProductDetails;
