import { faPlus, faSubtract, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREASE_QTY,
  DELETE_CART_ITEM,
  GET_TOTAL,
  INCREASE_QTY,
  UPDATE_QUANTITY,
} from "../../store/cartSlice";
import "./CartPage.scss";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(GET_TOTAL());
  }, [cart, dispatch]);
  return (
    <tr>
      <td className="img-cell">
        {/* <div> */}
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => dispatch(DELETE_CART_ITEM({ id: product.id }))}
          className="icon-remove"
        />
        <img src={product.image} alt="productimage" className="product-image" />
        <span className="product-name">{product.name}</span>
        {/* </div> */}
      </td>
      <td>${product.price}</td>
      <td>
        <div className="quantity-cell">
          <FontAwesomeIcon
            icon={faSubtract}
            className="icon-minus"
            onClick={() => dispatch(DECREASE_QTY(product.id))}
          />

          <span className="quantity-text">{product.quantity}</span>

          <FontAwesomeIcon
            icon={faPlus}
            className="icon-plus"
            onClick={() => dispatch(INCREASE_QTY(product.id))}
          />
        </div>
      </td>
      <td>${product.subTotal}</td>
    </tr>
  );
};

const Cart = () => {
  const { isEmpty, products, total } = useSelector((state) => state.cart);

  if (isEmpty) {
    return (
      <div className="empty-list-container">
        <h1 className="empty-list-text">Cart Is Empty! Do Some Shopping</h1>
      </div>
    );
  }

  return (
    <section className="section-cart">
      <div className="cart-header-container">
        <h1 className="header-text">Your Bag</h1>
      </div>
      <main className="cart-main">
        <div className="cart-left">
          <div className="cart-left-content">
            <table className="cart-left-content-table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => {
                  return <CartProduct product={product} key={product.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="cart-right">
          <div className="checkout">
            <h1 className="checkout-header">Cart Total</h1>
            <div className="checkout-info">
              <p className="checkout-info-text">Subtotal</p>
              <p className="checkout-info-price">$101.00</p>
            </div>
            <hr />
            <div className="total-info">
              <p className="total-info-text">Total</p>
              <p className="total-info-price">${total}</p>
            </div>
            <button className="btn btn-checkout">Proceed To Checkout</button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Cart;
