import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartState } from "../Context/Context";

const Logout = () => {
  const { dispatch, userDispatch } = CartState();
  const navigate = useNavigate();
  useEffect(() => {
    const Logoutpage = async () => {
      try {
        const res = await fetch("/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        navigate("/login");
        dispatch({
          type: "RESETCART",
        });
        userDispatch({
          type: "LOGGEDUSER",
          payload: "NOTAVAILABLE",
        });
        toast.error("Logged out");

        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };
    Logoutpage();
  });
  return <></>;
};

export default Logout;
