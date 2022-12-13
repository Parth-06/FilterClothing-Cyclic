import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { CartState } from "../Context/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userDispatch } = CartState();
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      toast.error("Invaid Login Details");
    } else {
      userDispatch({
        type: "LOGGEDUSER",
        payload: "AVAILABLE",
      });
      toast.success("Login successfully");
      navigate("/");
    }
  };

  const guestLogin = async (e) => {
    e.preventDefault();
    const Eval = "trial@gmail.com";
    setEmail(Eval);
    const Pass = "password@123";
    setPassword(Pass);

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Eval,
        password: Pass,
      }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      toast.error("Invaid Login Details");
    } else {
      userDispatch({
        type: "LOGGEDUSER",
        payload: "GUESTAVAILABLE",
      });
      toast.success("Login successfully");
      navigate("/");
    }
  };
  return (
    <>
      <div className="regi_main">
        <div className="regi">
          <div className="regi_name">
            <h1>Login</h1>
          </div>
          <form className="regi_form" method="POST">
            <div className="regi_in">
              <input
                type="email"
                placeholder="Email"
                className="regi_input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="regi_in">
              <input
                type="Password"
                placeholder="Password"
                className="regi_input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
          </form>
          <div className="regi_button">
            <button className="regi_button_test" onClick={guestLogin}>
              {" "}
              Guest Login
            </button>
            <button className="regi_button_main" onClick={loginuser}>
              {" "}
              Login
            </button>

            <button
              className="regi_button_main"
              style={{ border: "4px solid rgb(30, 13, 109)" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              {" "}
              Not Registered? Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
