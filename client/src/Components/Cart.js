import React, { useEffect, useState, memo, useContext } from "react";
import { CartState } from "../Context/Context";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";

const CheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const Callmainpage = async () => {
      try {
        const res = await fetch("/home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        await res.json();
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience");
        navigate("/login");
      }
    };
    Callmainpage();
  }, []);
};

const Cart = () => {
  const [total, setTotal] = useState();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  CheckToken();
  const navigate = useNavigate();

  const deletec = async (proddata) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: proddata,
    });
    toast.error("Removed From Bag");
  };

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const add = async (prod) => {
    const addv = prod.qty + 1;
    let quantity = parseInt(addv);
    let prod_id = prod.id.toString();
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: { prod_id, quantity },
    });
    toast.success("Quantity Updated");
  };

  const minus = async (prod) => {
    if (prod.qty === 1) {
      toast.error("Quantity cannot be zero");
    } else {
      const addv = prod.qty - 1;
      let quantity = parseInt(addv);
      let prod_id = prod.id.toString();
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: { prod_id, quantity },
      });
      toast.success("Quantity Updated");
    }
  };
  return (
    <>
      <div className="cart_page" id="cart_page">
        <div className="shopping_cart">
          <h2>Shopping Bag</h2>
          <span>
            <p>Price</p>
          </span>
          {cart.length === 0 ? (
            <div className="empty_cart">
              <div className="empty_cart_h1">
                <h1>Your Shopping Bag is Empty</h1>
                <p onClick={() => navigate("/")}>Continue Shopping?</p>
              </div>
            </div>
          ) : (
            <>
              {cart.map((prod) => {
                return (
                  <div className="shopping_cartleft" key={prod.id}>
                    <div className="left_image">
                      <Link
                        to="/productpage"
                        state={{ data: prod }}
                        style={{
                          color: "black",
                          textDecoration: "none",
                          listStyleType: "none",
                        }}
                      >
                        <LazyLoadImage src={prod.image} alt={prod.name} />
                      </Link>
                    </div>
                    <div className="right_details">
                      <Link
                        to="/productpage"
                        state={{ data: prod }}
                        style={{
                          color: "black",
                          textDecoration: "none",
                          listStyleType: "none",
                        }}
                      >
                        <h3>{prod.name} </h3>
                      </Link>
                      <div className="end_price_mobile">
                        <h3>₹ {prod.price}</h3>
                      </div>
                      <h6>Eligible for FREE Shipping</h6>
                      <h6 style={{ color: "green" }}>
                        {" "}
                        {!prod.inStock ? "out of stock" : "In Stock"}
                      </h6>
                      <div className="del_qty">
                        <div className="delete">
                          <span
                            className="delete_Span"
                            onClick={() => {
                              deletec(prod);
                            }}
                          >
                            Delete
                          </span>
                        </div>
                        <div className="product_qty">
                          <button
                            className="qty_btn"
                            onClick={() => minus(prod)}
                          >
                            -
                          </button>
                          <div className="qty_num">{prod.qty}</div>
                          <button className="qty_btn" onClick={() => add(prod)}>
                            +
                          </button>
                        </div>
                      </div>
                      <h5>₹ {prod.price}</h5>
                    </div>
                    <div className="end_price">
                      <h3>₹ {prod.price}</h3>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <h4>
            Subtotal ({cart.length} item): ₹{total}
          </h4>
        </div>

        <div className="price_cart">
          <p>
            <i className="fas fa-smile-wink"></i>Yay, Your order is eligible for
            FREE Delivery.
          </p>
          <h3>
            Subtotal ({cart.length} item): ₹{total}
          </h3>
          <button
            type="button"
            onClick={() => toast.success("Order Placed 😊")}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(Cart);
