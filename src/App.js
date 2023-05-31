import './App.css';
import LogIn from './login';
import Home from './home';
import Layout from './layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LogIn />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LogIn />} />
            {/* <Route path="todos" element={<Todos />} />
            <Route path="albums" element={<Albums />} />
            <Route path="posts" element={<Posts />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
