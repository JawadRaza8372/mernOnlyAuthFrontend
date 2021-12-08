import React from "react";
import "./HomePage.scss";
import { setUser } from "../../store/userAuth";
import { useSelector, useDispatch } from "react-redux";
function HomePage() {
  const { user } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const logoutFun = () => {
    localStorage.setItem("user", "");
    dispatch(setUser({ data: null }));
  };
  return (
    <>
      <section className="protectHome">
        <div className="centerdiv">
          <h1>Welcome {user?.name}</h1>
          <button onClick={logoutFun}>Logout</button>
        </div>
      </section>
    </>
  );
}

export default HomePage;
