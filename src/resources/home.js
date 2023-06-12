import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [currentUserExist, setCurrentUserExist] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.currentUsername;

  useEffect(() => {
    if (
      localStorage.currentUser === null ||
      localStorage.length === 0 ||
      !currentUserExist
    ) {
      setCurrentUserExist(true);
      localStorage.clear();

      navigate("/login");

    } else {
      navigate("/layout");
    }
  }, [currentUserExist]);



  const logout = () => {
    console.log("loging out");
    setCurrentUserExist(false);
  };

  
  return (
    <>
      <Outlet />
      <button onClick={logout}>Log Out</button>
    </>
  );
};


export default Home;
