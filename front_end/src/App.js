import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Topbar from "./components/Topbar";
import Posts from "./pages/Posts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewPost from "./pages/NewPost";

function App() {
  return (
    <>
      <Router>
        <div>
          <Topbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/newpost" element={<NewPost />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
