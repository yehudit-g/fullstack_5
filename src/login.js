import React, { Component,  useState, useEffect  } from "react";
import './headerStyle.css';

export function Home() {
        const [users, setUsers] = useState();
        const [isLoading, setLoading] = useState(false);
        const [isError, setError] = useState(false);
        const [username, setName] = useState();
        const [userPassword, setPassword] = useState();

        // this.handleChangePas = this.handleChangePas.bind(this);
        // this.handleChangename = this.handleChangename.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    

    /* קובץ ג'אוה סקריפט המקושר לכל העמודים */

    /* הפונקציה מופעלת בלחיצה על כפתור "התנתק" 
    -מחליפה את הכפתורים המוצגים ומוחקת את השם משתמש מהזיכרון */
    // logOut() {
    //     // document.getElementById("logOut").className = "hide";
    //     // document.getElementById("score").className = "hide";
    //     // document.getElementById("logIn1").className = "button_login";
    //     // document.getElementById("logIn2").className = "button_login";
    //     // localStorage.removeItem("userNow");
    // }


    /* הפונקציה מופעלת בטעינת כל דף, ואם יש משתמש מחובר" 
    -מחליפה את הכפתורים המוצגים ומציגה את שם המשתמש על המסך */
    function logIn() {
        console.log('success!!')
        // if (localStorage.getItem('userNow') != null) {
        //     document.getElementById("logOut").className = "button_logOut";
        //     document.getElementById("score").className = "button_logOut";
        //     document.getElementById("logIn1").className = "hide";
        //     document.getElementById("logIn2").className = "hide";
        //     document.getElementById("user").innerHTML = " שלום " + localStorage.getItem("userNow");
        // }
    }

    /* פונקציית התחברות, מקבלת נתנוים מהפורם ועושה בדיקות תקינות לקלט*/


    function handleChangename(event) {
        setName(event.target.value);
        console.log(event.target.value)
    }
    function  handleChangePas(event) {
        setPassword(event.target.value);
        console.log(userPassword)
    }

    async function handleSubmit(event) {
        console.log('hey hey')
       // setLoading(true);

        const response = await fetch("https://jsonplaceholder.typicode.com/users?username=Bret")
        if (response.ok) {
            const users1 = await response.json();
            this.setUsers(users1);
           // this.setLoading(false )
            console.log(users1)
        }
        else {
           // this.setState({ isError: false, isLoading: false })
        }
        let password = userPassword;
        let name = username;
        let user = users;

        if (user !== null) {
            if (user.address.geo.lat.slice(-4) === password) {
                console.log("there is a user succes!");
                localStorage.setItem("userNow", username);
                this.logIn();
            }
            else {
                alert("סיסמא לא נכונה");
                return false;
            }
        }
        else {
            alert("שם משתמש לא קיים במערכת");
            return false;
        }
        event.preventDefault();

    }

    function renderHead (){
        // return this.state.users.map(user => {
        //     return (
        //         <tr key={user.id}>
        //             <td>{user.address.geo.lat.slice(-4)}</td>
        //         </tr>
        //     )
        // })
    }

    function renderHome () {
        // return this.state.users.map(user => {
        //     return (
        //         <tr key={user.id}>
        //             <td>{user.name}</td>
        //         </tr>
        //     )
        // })
    }

        const _users=users;
        const _isLoading=isLoading;
        const _isError = isError;
        if (_isLoading) {
            return <div>Loading..</div>
        }
        if (_isError) {
            return <div>error..</div>
        }


        return (
            <div>
                {/* <div>
                    <nav id="navigation">
                        <a id="logOut" onclick="logOut()" href="home.html" class="hide">LogOut</a>
                        <a id="Info" href="info.html" class="hide">Info</a>
                        <a id="Todos" href="todos.html" class="hide">Todos </a>
                        <a id="Albums" href="albums.html" class="hide">Albums </a>
                        <a id="Posts" href="photos.html" class="hide">Posts </a>
                    </nav>
                </div> */}

                <div>
                    <form /* method="post"*/ name="myForm" onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="userName" placeholder="userName" value={username} onChange={handleChangename}></input>
                        </label>

                        <input name="password" placeholder="password" value={userPassword} onChange={handleChangePas}></input>
                        <button type="submit" id="logIn1" onSubmit={handleSubmit} className="button_login">LogIn</button>
                    </form>
                </div>

                <table>
                    <thead>
                    
                            {renderHead()}
                      
                    </thead>
                    <tbody>
                        {renderHome()}
                    </tbody>
                </table>
            </div>

        )
    }

export default Home;