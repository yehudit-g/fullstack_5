import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const username = localStorage.currentUsername;
  let userId;
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.id) {
      throw new Error("User is not logged in, cant show the 'layout'.");
    }
    userId = currentUser.id;
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <p>
        hello {username} {userId}
      </p>
      <nav>
        <ul>
          {/* < li>
            <Link to="/login">Log Out</Link>
          </li> */}
          <li>
            <Link to={`/users/${userId}/info`}>Info</Link>
          </li>
          <li>
            <Link to={`/users/${userId}/todos`}>Todos</Link>
          </li>
          <li>
            <Link to={`/users/${userId}/albums`}>Albums</Link>
          </li>
          <li>
            <Link to={`/users/${userId}/posts`}>Posts</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
