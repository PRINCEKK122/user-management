import { Routes, Route, HashRouter } from "react-router-dom";
import UsersList from "./components/UsersList";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/add" element={<UserForm />} />
        <Route path="/users/update/:id" element={<UserForm />} />
        <Route path="/users/delete/:id" element={<UsersList />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
