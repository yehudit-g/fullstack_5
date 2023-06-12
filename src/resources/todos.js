import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Todos = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortCriterion, setSortCriterion] = useState("serial");
  let userId;


  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser || !currentUser.id) {
        throw new Error("localStorage is empty, can't show the 'Todos'.");
      }
      userId = currentUser.id;
    } catch (error) {
      console.error(error);
    }

    let filteredTodos;
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        filteredTodos = data.filter((item) => item.userId === userId);

        let sortedTodos = filteredTodos;
        if (sortCriterion === "performance") {
          sortedTodos = filteredTodos.sort((a, b) => b.completed - a.completed);
        } else if (sortCriterion === "alphabetical") {
          sortedTodos = filteredTodos.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        } else if (sortCriterion === "random") {
          sortedTodos = filteredTodos.sort(() => Math.random() - 0.5);
          console.log(sortedTodos);
        }

        setFilteredData(sortedTodos);
        setFilteredData(filteredTodos);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error + "there is a problem with the fetch");

        setLoading(false);
      });
  }, [sortCriterion]);



  const handleSortChange = (event) => {
    setSortCriterion(event.target.value);
  };


  return (
    <>
      <Link to={`/users/${userId}/layout`}>Go back</Link>
      <h1>Todos of {localStorage.currentUsername}:</h1>

      <div>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select"  value={sortCriterion} onChange={handleSortChange}>
          <option value="serial">Serial</option>
          <option value="performance">Performance</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : filteredData !== null ? (
        <ul>
          {filteredData.map((item) => (
            <li key={item.id} >
              {item.title}
              {item.completed ? (
                <input type="checkbox" checked />
              ) : (
                <input type="checkbox" />
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

export default Todos;
