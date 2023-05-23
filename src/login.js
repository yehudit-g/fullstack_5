import React, { Component } from "react";
import './headerStyle.css';

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: true,
            isError: false,
            userNow: null,
            username: '',
            userPassword: ''
        }
        this.handleChangePas = this.handleChangePas.bind(this);
        this.handleChangename = this.handleChangename.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* קובץ ג'אוה סקריפט המקושר לכל העמודים */

    /* הפונקציה מופעלת בלחיצה על כפתור "התנתק" 
    -מחליפה את הכפתורים המוצגים ומוחקת את השם משתמש מהזיכרון */
    logOut() {
        // document.getElementById("logOut").className = "hide";
        // document.getElementById("score").className = "hide";
        // document.getElementById("logIn1").className = "button_login";
        // document.getElementById("logIn2").className = "button_login";
        // localStorage.removeItem("userNow");
    }


    /* הפונקציה מופעלת בטעינת כל דף, ואם יש משתמש מחובר" 
    -מחליפה את הכפתורים המוצגים ומציגה את שם המשתמש על המסך */
    logIn() {
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


    handleChangename(event) {
        console.log(event.target.value)
        this.setState({ username: event.target.value });
    }
    handleChangePas(event) {
        this.setState({ userPassword: event.target.value });
    }

    handleSubmit(event) {
        console.log('hey hey')
        let password = this.state.userPassword;
        let name = this.state.username;
        let user = this.state.users;

        if (user !== null) {
            if (user.address.geo.lat.slice(-4) === password) {
                localStorage.setItem("userNow", user.username);
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


    async componentDidMount() {
        this.setState({ isLoading: true })

        const response = await fetch("https://jsonplaceholder.typicode.com/users?username=Bret")
        if (response.ok) {
            const users = await response.json();
            this.setState({ users: users, isLoading: false })
        }
        else {
            this.setState({ isError: false, isLoading: false })
        }
    }

    renderHead = () => {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.address.geo.lat.slice(-4)}</td>
                </tr>
            )
        })
    }

    renderHome = () => {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                </tr>
            )
        })
    }

    render() {
        const { users, isLoading, isError } = this.state;
        if (isLoading) {
            return <div>Loading..</div>
        }
        if (isError) {
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
                    <form /* method="post"*/ name="myForm" onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="userName" placeholder="userName" value={this.state.username} onChange={this.handleChangename}></input>
                        </label>

                        <input name="password" placeholder="password" value={this.state.userPassworduserPassword} onChange={this.handleChangePas}></input>
                        <button type="submit" id="logIn1" onSubmit={this.handleSubmit} className="button_login">LogIn</button>
                    </form>
                </div>

                <table>
                    <thead>
                    
                            {this.renderHead()}
                      
                    </thead>
                    <tbody>
                        {this.renderHome()}
                    </tbody>
                </table>
            </div>

        )
    }
}

export default Home;