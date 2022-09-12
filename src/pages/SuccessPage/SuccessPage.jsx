import React from "react";
import { Link } from "react-router-dom";
import "./SuccessPage.scss";

const SuccessPage = () => {
  return (
    <div className="success-msg-container">
      <p className="success-msg"> Your Order Has Been Placed Succefully</p>
      <Link to="/">
        <button className="btn">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default SuccessPage;
