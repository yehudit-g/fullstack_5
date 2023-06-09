import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Comments = () => {
  const { idUser, idPost } = useParams();
  console.log(idUser, idPost);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let filteredComments;
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        filteredComments = data.filter((item) => item.postId === idPost);

        setFilteredData(filteredComments);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error + "there is a problem with the fetch");

        setLoading(false);
      });
  }, [idPost]);
  return (
    <>
      {/* <Outlet /> */}
      <Link to={`/users/${idUser}/layout`}>Go </Link>
      <h1>
        Comments of post {idPost} of {localStorage.currentUsername}:
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length > 0 ? (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              <strong>ID:</strong> {item.id}
              <br />
              <strong>Name:</strong> {item.name}
              <br />
              <strong>Email:</strong> {item.email}
              <br />
              <strong>Body:</strong> {item.body}
              <br />
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments found for the specified user.</p>
      )}
    </>
  );
};

export default Comments;
