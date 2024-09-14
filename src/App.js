import UsersList from "./components/UsersList";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={</>} /> */}
        <Route path="/users/:id" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
