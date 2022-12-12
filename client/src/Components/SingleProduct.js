import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const SingleProduct = memo(({ prod, cartdata }) => {
  return (
    <Link
      style={{ color: "black", textDecoration: "none", listStyleType: "none" }}
      to="/productpage"
      state={{ data: prod, cartdata: cartdata }}
    >
      <div className="card">
        <div className="card_image">
          <img src={prod.image} alt={""} />
        </div>
        <div className="card_body">
          <p className="card_title">{prod.name}</p>
          <p className="card_des">
            <Rating initialValue={prod.ratings} size={25} readonly />
          </p>

          {prod.fastDelivery ? (
            <div className="card_des" style={{ fontWeight: "700" }}>
              Fast Delivery
            </div>
          ) : (
            <div className="card_des" style={{ fontWeight: "700" }}>
              Deliverd in 4 days
            </div>
          )}
          <p className="price">
            ₹ {prod.price}{" "}
            <del style={{ fontSize: "15px", color: " rgb(78, 75, 75)" }}>
              ₹ {prod.mrp}
            </del>
          </p>
        </div>
      </div>
    </Link>
  );
});

export default memo(SingleProduct);
