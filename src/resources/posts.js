import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || !currentUser.id) {
        throw new Error("localStorage is empty, can't show the 'Posts'.");
      }
      setUserId(currentUser.id);
    } catch (error) {
      console.error(error);
    }

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const filteredTodos = data.filter((item) => item.userId === userId);
        setFilteredData(filteredTodos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error + "there is a problem with the fetch");
        setLoading(false);
      });
  }, [userId]);

  
  const [clickedItems, setClickedItems] = useState([]);

  const handleClick = (itemId) => {
    setClickedItems((prevClickedItems) => {
      if (prevClickedItems.includes(itemId)) {
        return prevClickedItems.filter((id) => id !== itemId);
      } else {
        return [itemId];
      }
    });
  };

  return (
    <>
      <Link to={`/users/${userId}/layout`}>Go back</Link>
      <h1>Posts of {localStorage.currentUsername}:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredData !== null ? (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                style={{
                  backgroundColor: clickedItems.includes(item.id)
                    ? "lightblue"
                    : "white",
                }}
              >
                <strong>ID:</strong> {item.id}
                <br />
                <strong>Title:</strong> {item.title}
                <br />
                <strong>Body:</strong> {item.body}
                <br />
                <br />
              </button>
              {clickedItems.includes(item.id) && (
                <Link
                  to={`/users/${userId}/posts/${item.id}/comments?userId=${userId}`}
                >
                  Comments
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos found for the specified user.</p>
      )}
    </>
  );
};

export default Posts;
