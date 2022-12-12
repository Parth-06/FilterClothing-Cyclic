import React, { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [checklog, setChecklog] = useState(true);

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
        setChecklog(true);
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

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </div>
        }
      >
        {checklog === true ? (
          <div className="profile">
            <Link to="/logout" className="for_link">
              <button className="Addcart">Logout</button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </Suspense>
    </>
  );
};

export default Profile;
