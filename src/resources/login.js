import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./headerStyle.css";
import "./login.css";

export function LogIn() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [username, setName] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();

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
        `https://jsonplaceholder.typicode.com/users?username=${username}`
      );

      if (response.ok) {
        const dataUsers = await response.json();
        setUsers(dataUsers);
        
        //console.log(dataUsers);

        const user = dataUsers.find((user) => user.username === username);

        if (user !== undefined) {
          //console.log("This is the username");
          //console.log(user.address.geo.lat.slice(-4) + " last 4 digits");

          if (user.address.geo.lat.slice(-4) === userPassword) {
            alert("Yes, the username and password are correct!");
            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("currentUsername", username);
            localStorage.setItem("currentUserId", user.id);
            const userId = JSON.parse(localStorage.getItem("currentUser")).id;
            navigate(`/users/${userId}/layout`);
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


  return (
    <div id="div_signIn">
      <div className="wrapper">
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
