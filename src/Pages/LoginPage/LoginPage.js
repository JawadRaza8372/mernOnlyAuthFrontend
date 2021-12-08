import axios from "axios";
import jwt from "jsonwebtoken";
import React, { useState } from "react";
import { setUser } from "../../store/userAuth";
import { useDispatch } from "react-redux";
import "./LoginPage.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [loginformdata, setloginformdata] = useState({
    email: "",
    password: "",
  });
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const dispatch = useDispatch();

  const handleChangeLogin = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setloginformdata((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setformdata((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const loginForm = async (e) => {
    e.preventDefault();

    const resp = await axios.post("http://localhost:4000/login", loginformdata);
    const mainData = resp?.data;
    if (mainData?.data === null) {
      toast.error(`${mainData?.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Successfully Loged In.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const user = resp?.data?.data?.user;
      localStorage.setItem("user", JSON.stringify(user));
      const decoded = jwt.decode(user);
      dispatch(setUser({ data: decoded }));
    }
  };
  const registerForm = async (e) => {
    e.preventDefault();
    const resp = await axios.post("http://localhost:4000/register", formdata);
    console.log(resp.data);
    const mainData = resp?.data;
    if (mainData?.data === null) {
      toast.error(`${mainData?.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(" Account Created Successfully.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setloginlayout(true);
      setformdata({ name: "", email: "", password: "", confirm: "" });
      setloginformdata({ email: "", password: "" });
    }
  };
  const [loginlayout, setloginlayout] = useState(true);
  const switchLayout = () => {
    setloginlayout(!loginlayout);
    setformdata({ name: "", email: "", password: "", confirm: "" });
    setloginformdata({ email: "", password: "" });
  };
  return (
    <section className="authpage">
      <div className="containerDiv">
        <div className="header">
          <h1>{loginlayout ? "Login" : "Sign Up"}</h1>
        </div>
        {loginlayout ? (
          <div className="content">
            <form onSubmit={loginForm}>
              <input
                minLength={5}
                value={loginformdata.email}
                type="email"
                placeholder="Enter your email"
                onChange={handleChangeLogin}
                id="email"
              />
              <input
                minLength={5}
                value={loginformdata.password}
                type="password"
                placeholder="Enter your password"
                onChange={handleChangeLogin}
                id="password"
              />
              <button type="submit">Login</button>
            </form>
            <div className="seprator" />
            <button onClick={switchLayout}>Create Account</button>
          </div>
        ) : (
          <div className="content">
            <form onSubmit={registerForm}>
              <input
                minLength={5}
                value={formdata.name}
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
                id="name"
              />
              <input
                minLength={5}
                value={formdata.email}
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                id="email"
              />
              <input
                minLength={5}
                value={formdata.password}
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                id="password"
              />
              <input
                minLength={5}
                value={formdata.confirm}
                type="password"
                placeholder="Re-Enter your password"
                onChange={handleChange}
                id="confirm"
              />
              <button type="submit">Sign Up</button>
            </form>

            <div className="seprator" />
            <button onClick={switchLayout}>Have An Account</button>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </section>
  );
}
