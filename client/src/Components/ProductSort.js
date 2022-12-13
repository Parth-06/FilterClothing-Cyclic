import React from "react";
import { CartState } from "../Context/Context";
import SingleProduct from "./SingleProduct";

const ProductSort = () => {
  const {
    state: { data },
    productState: {
      byStock,
      byFastDelivery,
      sort,
      searchQuery,
      byRating,
      Men,
      Women,
      Kids,
    },
  } = CartState();

  let sortedProducts = data;

  if (sort) {
    sortedProducts = sortedProducts.sort((a, b) =>
      sort === "lowtohigh" ? a.price - b.price : b.price - a.price
    );
  }

  if (!byStock) {
    sortedProducts = sortedProducts.filter((prod) => prod.inStock);
  }

  if (byFastDelivery) {
    sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
  }

  if (Men) {
    sortedProducts = sortedProducts.filter((prod) => prod.category === "Men");
  }
  if (Women) {
    sortedProducts = sortedProducts.filter((prod) => prod.category === "Women");
  }
  if (Kids) {
    sortedProducts = sortedProducts.filter((prod) => prod.category === "Kids");
  }

  if (byRating) {
    sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating);
  }
  if (searchQuery) {
    sortedProducts = sortedProducts.filter((prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="right_box">
      <h4>
        Clothes{" "}
        <span className="showing">
          (Showing {sortedProducts.length} products of {data.length} products)
        </span>
      </h4>

      <div className="right_box_products">
        {sortedProducts.length === 0 ? (
          <div className="no_products">
            <i class="fas fa-exclamation-circle"></i>
            <h1>Sorry, no results found!</h1>
            <h3>
              Please check the spelling or try searching for something else
            </h3>
          </div>
        ) : (
          <>
            {sortedProducts.map((prod) => {
              return <SingleProduct prod={prod} key={prod.id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSort;
