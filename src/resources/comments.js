import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comments = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  let userId;
  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || !currentUser.id) {
        throw new Error("localStorage is empty, can't show the 'Comments'.");
      }
      userId = currentUser.id;
    } catch (error) {
      console.error(error);
    }
    let filteredTodos;
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        filteredTodos = data.filter((item) => item.postId === userId);

        setFilteredData(filteredTodos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error + "there is a problem with the fetch");

        setLoading(false);
      });
  }, []);
  return (
    <>
      {/* <Outlet /> */}
      <Link to={`/users/${userId}/layout`}>Go back</Link>
      <h1>
        Comments of {localStorage.currentUsername} post of{" "}
        {localStorage.currentUsername}:
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredData !== null ? (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              <strong>ID:</strong> {item.id}
              <br />
              <strong>Title:</strong> {item.title}
              <br />
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos found for the specified user.</p>
      )}
    </>
  );
};

export default Comments;
