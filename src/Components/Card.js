import React, { useState, useEffect } from "react";
import Products from "../Products.json";
import { Link } from "react-router-dom";
import "./Card.css";
import { FaShoppingCart } from "react-icons/fa";

const Card = () => {
  const [searchItem, setSearchItem] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setFilteredProduct(Products);
  }, []);

  const handleSearch = (value) => {
    if (searchItem.trim()!=="") {
      const filtered = Products.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredProduct(filtered);
    }
  };

  const handleInputChange = (value) => {
    setSearchItem(value);
    if (value.trim() === "") {
      setFilteredProduct(Products);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedProducts = [...filteredProduct];
    if (option === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProduct(sortedProducts);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <>
      <div className="top-bar">
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="sort-dropdown"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchItem}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="cart-icon">
          <FaShoppingCart />
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>

      <div className="card-container">
        {filteredProduct.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img
                className="card-img"
                src={product.image}
                alt="Image"
                width="100%"
                height="250px"
              />
            </Link>
            <h3 className="card-title">{product.name}</h3>
            <p>
              <strong className="card-price">$ {product.price}</strong>
            </p>
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
