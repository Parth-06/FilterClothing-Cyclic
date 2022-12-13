import React from "react";
import "react-toastify/dist/ReactToastify.css";
import HeaderFilter from "./HeaderFilter";
import LeftBox from "./LeftBox";
import ProductSort from "./ProductSort";

const Home = () => {
  return (
    <>
      <HeaderFilter />
      <div className="main">
        <LeftBox />

        <div>
          <ProductSort />
        </div>
      </div>
    </>
  );
};

export default Home;
