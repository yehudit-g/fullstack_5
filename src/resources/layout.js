import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const username = localStorage.currentUsername;

  return (
    <>
      <p>hello {username}</p>
      <nav>
        <ul>
          {/* <li>
                        <Link to="/home">Home</Link>
                    </li> */}
          <li>
            <Link to="/login">Log Out</Link>
          </li>
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
      </nav>
    </>
  );
};

export default Layout;
