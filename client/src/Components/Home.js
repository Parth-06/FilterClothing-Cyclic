import React, { memo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { CartState } from "../Context/Context";
import HeaderFilter from "./HeaderFilter";
import LeftBox from "./LeftBox";
const ProductSort = React.lazy(() => import("./ProductSort"));

const Home = () => {
  const {
    state: { data },
  } = CartState();
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

export default memo(Home);
