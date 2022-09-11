import React from "react";
import { FilterBar, ProductList } from "../../components/index";
import "./ProductsListPage.scss";

const ProductsListPage = () => {
  return (
    <div>
      <FilterBar />
      <ProductList />
    </div>
  );
};

export default ProductsListPage;
