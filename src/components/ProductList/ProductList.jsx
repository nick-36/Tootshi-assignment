import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllProducts from "../../data/products";
import { SET_PRODUCTS } from "../../store/productsSlice";
import { Product } from "../index";
import "./ProductList.scss";

const EmptyList = () => (
  <div className="empty-list-container">
    <h1 className="empty-list-text">No Result Found!</h1>
  </div>
);

const ProductList = () => {
  const { products, isEmpty } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_PRODUCTS(AllProducts));
  }, []);

  return (
    <section className="section-product-list">
      {isEmpty ? (
        <EmptyList />
      ) : (
        <table className="product-list-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Buy</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, i) => {
              return <Product product={product} key={i} />;
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default ProductList;
