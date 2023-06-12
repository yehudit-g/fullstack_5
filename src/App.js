import "./App.css";
import LogIn from "./resources/login";
import Home from "./resources/home";
import Layout from "./resources/layout";
import Todos from "./resources/todos";
import Albums from "./resources/albums";
import Posts from "./resources/posts";
import Info from "./resources/info";
import Comments from "./resources/comments";
import Photos from "./resources/photos";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/users/:idUser/layout" element={<Layout />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/users/:idUser/todos" element={<Todos />} />
            <Route path="/users/:idUser/albums" element={<Albums />} />
            <Route path="/users/:idUser/posts" element={<Posts />} />
            <Route path="/users/:idUser/info" element={<Info />} />
            <Route
              path="/users/:idUser/posts/:idPost/comments"
              element={<Comments />}
            />
            <Route
              path="/users/:idUser/albums/:idAlbum/photos"
              element={<Photos />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
