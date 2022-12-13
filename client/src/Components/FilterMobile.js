import React from "react";
import { CartState } from "../Context/Context";
import { Rating } from "react-simple-star-rating";

const FilterMobile = () => {
  const {
    productState: { byStock, byFastDelivery, sort, byRating },
    productDispatch,
  } = CartState();
  const handleRating = (rate) => {
    productDispatch({ type: "FILTER_BY_RATING", payload: rate });
  };
  return (
    <div className="left_box_mobile">
      <div className="filter_title_two">
        <h4>By PRICE</h4>

        <div className="radio_box">
          <label className="label_radio">
            <input
              type="radio"
              className="radio_in"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowtohigh",
                })
              }
              checked={sort === "lowtohigh" ? true : false}
            />
            Low to high
          </label>
          <br />
          <label className="label_radio">
            <input
              type="radio"
              className="radio_in"
              onChange={() =>
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "hightolow",
                })
              }
              checked={sort === "hightolow" ? true : false}
            />
            High to Low
          </label>
          <br />
        </div>
      </div>

      <div className="border"></div>
      <div className="filter_title_two">
        <h4>By Preference</h4>
        <form className="radio_box">
          <label className="label_radio">
            <input
              type="checkbox"
              className="radio_in"
              onChange={() => productDispatch({ type: "FILTER_BY_STOCK" })}
              checked={byStock}
            />
            Include Out of Stock
          </label>
          <br />
          <label className="label_radio">
            <input
              type="checkbox"
              className="radio_in"
              onChange={() => productDispatch({ type: "FILTER_BY_DELIVERY" })}
              checked={byFastDelivery}
            />
            Fast Delivery Only
          </label>
          <br />
        </form>
      </div>
      <div className="border"></div>
      <div className="filter_title_two">
        <h4>By Customer Review</h4>
        <div className="radio_box">
          <div>
            <Rating onClick={handleRating} initialValue={byRating} size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMobile;
