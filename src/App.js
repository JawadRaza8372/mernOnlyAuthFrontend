import Routes from "./Navigation/Routes";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { setUser } from "./store/userAuth";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const rawdata = localStorage.getItem("user");
      if (rawdata) {
        const data = await JSON.parse(rawdata);
        const decode = await jwt.decode(data);
        dispatch(setUser({ data: decode }));
      }
      console.log(rawdata);
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
