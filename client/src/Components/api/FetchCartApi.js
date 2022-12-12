import React, { useEffect, useState } from "react";
import { CartState } from "../../Context/Context";

const FetchCartApi = () => {
  const {
    dispatch,
    userState: { user },
  } = CartState();

  useEffect(() => {
    const Fetchcart = async () => {
      const res = await fetch("/cartdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const cartdata = await res.json();
      dispatch({
        type: "CARTDATA",
        payload: cartdata,
      });
    };
    Fetchcart();
  }, [user]);

  return <></>;
};

export default FetchCartApi;
