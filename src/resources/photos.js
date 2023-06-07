import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Photos = () => {
  const { idUser, idAlbum } = useParams();
  console.log(idUser, idAlbum);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let filteredPhotos;
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        filteredPhotos = data.filter((item) => item.albumId == idAlbum );
        console.log(idAlbum +"id album");
        console.log(filteredPhotos)

        setFilteredData(filteredPhotos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error + "there is a problem with the fetch");

        setLoading(false);
      });
  }, [idAlbum]);


  return (
    <>
      {/* <Outlet /> */}
      <Link to={`/users/${idUser}/layout`}>Go back</Link>
      <h1>
        Photos of album {idAlbum} of {localStorage.currentUsername}:
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length > 0 ? (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id}>
              <strong>ID:</strong> {item.id}
              <br />
              <strong>Title:</strong> {item.title}
              <br />
              <strong>Url:</strong> {item.url}
              <br />
              <strong>thumbnailUrl:</strong> {item.thumbnailUrl}
              <br />
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No photos found for the specified album.</p>
      )}
    </>
  );
};

export default Photos;
