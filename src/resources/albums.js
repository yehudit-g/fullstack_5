import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Albums = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  let userId;


  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || !currentUser.id) {
        throw new Error("localStorage is empty, can't show the 'Posts'.");
      }
      userId = currentUser.id;
    } catch (error) {
      console.error(error);
    }


    let filteredTodos;
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        filteredTodos = data.filter((item) => item.userId === userId);

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
      <h1>Albums of {localStorage.currentUsername}:</h1>

      {loading ? (
        <p>Loading...</p>
      ) : filteredData !== null ? (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              <Link to={`/users/${item.userId}/albums/${item.id}/photos?userId=${userId}`}>
                {console.log(`/users/${item.userId}/albums/${item.id}/photos?userId=${userId}`)}
                <strong>ID:</strong> {item.id}
                <br />
                <strong>Title:</strong> {item.title}
                <br />
              </Link>
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No albums found for the specified user.</p>
      )}
    </>
  );
};

export default Albums;
