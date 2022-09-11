import {
  faCartShopping,
  faPlus,
  faSubtract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { ADD_CART_ITEM, DELETE_CART_ITEM } from "../../store/cartSlice";

const Product = ({ product, cart, setCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { image, name, price, instock, color } = product;
  const dispatch = useDispatch();

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
    } else if (quantity > 1 && type === "dec") {
      setQuantity((prev) => (prev -= 1));
    }
  };

  return (
    <tr className="product">
      <td>
        <img src={image} alt={name} className="product-img" />
      </td>
      <td>{name}</td>
      <td>{color}</td>
      <td>{instock ? "In Stock" : "Out Of Stock"}</td>
      <td>${price}.00</td>
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
    </tr>
  );
};

export default Product;
