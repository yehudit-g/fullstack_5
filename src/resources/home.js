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

      {/* <p>hello {username}</p> */}
      {/* <nav>
        <ul>
         
          <button onClick={logout}>Log Out</button>
          <li>
            <Link to="/info">Info</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
          <li>
            <Link to="/albums">Albums</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav> */}
    </>
  );
};

// return (
//     <div >

//         {/* <div>
//                 <nav id="navigation">
//                     <a id="logOut" onclick="logOut()" href="home.html" class="hide">LogOut</a>
//                     <a id="Info" href="info.html" class="hide">Info</a>
//                     <a id="Todos" href="todos.html" class="hide">Todos </a>
//                     <a id="Albums" href="albums.html" class="hide">Albums </a>
//                     <a id="Posts" href="photos.html" class="hide">Posts </a>
//                 </nav>
//             </div> */}

//     </div>
// )

export default Home;
