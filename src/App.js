import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./components/UsersList";
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users/add" element={<UserForm />} />
        {/* <Route path="/users" element={<UsersList />} />  */}
        <Route path="/users/:id" element={<UsersList />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
