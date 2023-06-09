import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Photos = () => {
  const { idUser, idAlbum } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPicture, setCurrentPicture] = useState(0);
  const [currentPictureNum, setCurrentPictureNum] = useState(0);

  useEffect(() => {
    //let filteredPhotos;
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        let filteredPhotos = data.filter((item) => item.albumId == idAlbum);
        setFilteredData(filteredPhotos);
        setCurrentPicture(filteredPhotos[currentPictureNum]);
        console.log(filteredData);
        console.log(filteredData[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error + "there is a problem with the fetch");

        setLoading(false);
      });
  }, [idAlbum]);

  const goNextPicture = () => {
    setCurrentPictureNum((prevPictureNum) => {
      let nextPictureNum = prevPictureNum + 1;
      if (nextPictureNum >= filteredData.length) {
        nextPictureNum = 0;
      }
      setCurrentPicture(filteredData[nextPictureNum]);
      return nextPictureNum;
    });
  };

  const goPreviousPicture = () => {
    setCurrentPictureNum((prevPictureNum) => {
      let previousPictureNum = prevPictureNum - 1;
      if (previousPictureNum < 0) {
        previousPictureNum = filteredData.length - 1;
      }
      setCurrentPicture(filteredData[previousPictureNum]);
      return previousPictureNum;
    });
  };
  return (
    <>
      {/* <Outlet /> */}
      <Link to={`/users/${idUser}/albums`}>Go back</Link>
      <h1>
        Photos of album {idAlbum} of {localStorage.currentUsername}:
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : currentPicture ? (
        <div key={currentPicture.id}>
          <strong>ID:</strong> {currentPicture.id}
          <br />
          <strong>Title:</strong> {currentPicture.title}
          <br />
          <button onClick={goPreviousPicture}>◀</button>
          <button onClick={goNextPicture}>▶</button>
          <br />
          <img
            src={currentPicture.thumbnailUrl}
            style={{ height: "70vh" }}
            alt="Thumbnail"
          />
        </div>
      ) : (
        <p>No more photos.</p>
      )}
    </>
  );
};

export default Photos;
