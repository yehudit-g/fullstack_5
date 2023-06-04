import "./App.css";
import LogIn from "./resources/login";
import Home from "./resources/home";
import Layout from "./resources/layout";
import Todos from "./resources/todos";
import Albums from "./resources/albums";
import Posts from "./resources/posts";
import Info from "./resources/info";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Layout />} /> */}
            {/* <Route index element={<Layout />} /> */}
            <Route path="layout" element={<Layout />} />
            <Route path="login" element={<LogIn />} />
            <Route path="todos" element={<Todos />} />
            <Route path="albums" element={<Albums />} />
            <Route path="posts" element={<Posts />} />
            <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
