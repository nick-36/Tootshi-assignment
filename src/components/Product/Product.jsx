import {
  faCartShopping,
  faPlus,
  faSubtract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CART_ITEM,
  DECREASE_QTY,
  DELETE_CART_ITEM,
  INCREASE_QTY,
} from "../../store/cartSlice";

import "./Product.scss";

const Product = ({ product, cart, setCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { image, name, price, instock, color, size } = product;
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);

  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (selected) {
      dispatch(DELETE_CART_ITEM({ id: product.id }));
    } else {
      dispatch(ADD_CART_ITEM({ product, quantity }));
    }
    setSelected((prev) => !prev);
  };

  const handleQuantity = (type) => {
    if (type === "inc") {
      setQuantity((prev) => (prev += 1));
      if (selected) {
        if (products.find((item) => item.id === product.id)) {
          dispatch(INCREASE_QTY(product.id));
        } else {
          dispatch(ADD_CART_ITEM({ product, quantity }));
        }
      }
    } else if (quantity > 1 && type === "dec") {
      setQuantity((prev) => (prev -= 1));
      if (selected) {
        if (products.find((item) => item.id === product.id)) {
          dispatch(DECREASE_QTY(product.id));
        } else {
          dispatch(ADD_CART_ITEM({ product, quantity }));
        }
      }
    }
  };
  return (
    <tr className="product">
      <td>
        <img src={image} alt={name} className="product-img" />
      </td>
      <td>{name}</td>
      <td>{size}</td>
      <td>{color}</td>
      <td className={instock ? "in-stock" : "out-stock"}>
        {instock ? "In Stock" : "Out Of Stock"}
      </td>
      <td>${price}.00</td>
      {instock && (
        <td>
          <div className="product-select">
            <div className="quantity-cell">
              <FontAwesomeIcon
                icon={faSubtract}
                data-name="dec"
                className="icon-minus"
                onClick={() => handleQuantity("dec")}
              />

              <span className="quantity-text">{quantity}</span>

              <FontAwesomeIcon
                icon={faPlus}
                data-name="inc"
                className="icon-plus"
                onClick={() => handleQuantity("inc")}
              />
            </div>
            <div className="icon-box">
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
            <input type="checkbox" onChange={handleSelect} />
          </div>
        </td>
      )}
    </tr>
  );
};

export default Product;
