import { Outlet, Link } from "react-router-dom";

const Home = () => {
 // const [username, setName] = useState("");
const username=localStorage.userNow;
  return (
    <>   

    <p>hello {username}</p>
    </>
  )
};




    // return (
    //     <div >

    //         {/* <div>
    //                 <nav id="navigation">
    //                     <a id="logOut" onclick="logOut()" href="home.html" class="hide">LogOut</a>
    //                     <a id="Info" href="info.html" class="hide">Info</a>
    //                     <a id="Todos" href="todos.html" class="hide">Todos </a>
    //                     <a id="Albums" href="albums.html" class="hide">Albums </a>
    //                     <a id="Posts" href="photos.html" class="hide">Posts </a>
    //                 </nav>
    //             </div> */}

    //     </div>
    // )




export default Home;