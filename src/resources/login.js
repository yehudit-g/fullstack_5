import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./headerStyle.css";
import "./login.css";

export function LogIn() {
  //const [goToLayout, setGoToLayout] = useState(false);

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [username, setName] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();

  /* הפונקציה מופעלת בלחיצה על כפתור "התנתק" 
    -מחליפה את הכפתורים המוצגים ומוחקת את השם משתמש מהזיכרון */
  function logOut() {
    // document.getElementById("logOut").className = "hide";
    // document.getElementById("score").className = "hide";
    // document.getElementById("logIn1").className = "button_login";
    // document.getElementById("logIn2").className = "button_login";
    // localStorage.removeItem("userNow");
  }

  /* הפונקציה מופעלת בטעינת כל דף, ואם יש משתמש מחובר" 
    -מחליפה את הכפתורים המוצגים ומציגה את שם המשתמש על המסך */
  function logIn() {
    console.log("success!!");
    //navigate("/home");

    // if (localStorage.getItem('userNow') != null) {
    //     document.getElementById("logOut").className = "button_logOut";
    //     document.getElementById("score").className = "button_logOut";
    //     document.getElementById("logIn1").className = "hide";
    //     document.getElementById("logIn2").className = "hide";
    //     document.getElementById("user").innerHTML = " שלום " + localStorage.getItem("userNow");
    // }
  }

  //פונקציות המעדכנות את שם המשתמש והסיסמא בכל שינוי בקלט
  function handleChangename(event) {
    setName(event.target.value);
  }
  function handleChangePas(event) {
    setPassword(event.target.value);
  }

  //פונקציה המופעלת בלחיצה על כפתור כניסה, בודקת אם פרטי המשתמש קיימים בבסיס נתונים ונכונים
  async function handleSubmit(event) {
    event.preventDefault();

    if (username.trim() === "" || userPassword.trim() === "") {
      alert("The username or the password is empty.");
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );

      if (response.ok) {
        const dataUsers = await response.json();
        setUsers(dataUsers);

        console.log(dataUsers);

        const user = dataUsers.find((user) => user.username === username);

        if (user !== undefined) {
          console.log("This is the username");
          console.log(user.address.geo.lat.slice(-4) + " last 4 digits");

          if (user.address.geo.lat.slice(-4) === userPassword) {
            alert("Yes, the username and password are correct!");
            localStorage.setItem("currentUser", user);
            localStorage.setItem("currentUsername", username);
            navigate("/layout");
            // setGoToLayout(true);
          } else {
            alert("Incorrect password");
          }
        } else {
          alert("Username not found");
        }
      } else {
        alert("Error fetching users");
      }
    } catch (error) {
      alert("Error fetching users:", error);
    }
  }

  //  function renderHome() {
  // return this.state.users.map(user => {
  //     return (
  //         <tr key={user.id}>
  //             <td>{user.name}</td>
  //         </tr>
  //     )
  // })
  //  }

  // const _users = users;
  // const _isLoading = isLoading;
  // const _isError = isError;
  // if (_isLoading) {
  //     return <div>Loading..</div>
  // }
  // if (_isError) {
  //     return <div>error..</div>
  // }
  // if (goToLayout) {
  //   navigate("/layout");
  // }
  return (
    <div id="div_signIn">
      {/* {logOut()} */}
      <div className="wrapper">
        {/* <div>
                    <nav id="navigation">
                        <a id="logOut" onclick="logOut()" href="home.html" class="hide">LogOut</a>
                        <a id="Info" href="info.html" class="hide">Info</a>
                        <a id="Todos" href="todos.html" class="hide">Todos </a>
                        <a id="Albums" href="albums.html" class="hide">Albums </a>
                        <a id="Posts" href="photos.html" class="hide">Posts </a>
                    </nav>
                </div> */}

        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <br />
              <input
                type="text"
                name="userName"
                placeholder="userName"
                value={username}
                onChange={handleChangename}
              ></input>
            </label>
            <br />
            <label>
              password:
              <br />
              <input
                name="password"
                placeholder="password"
                value={userPassword}
                onChange={handleChangePas}
              ></input>
            </label>
            <button
              type="submit"
              id="logIn1"
              onSubmit={handleSubmit}
              className="button_login"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
