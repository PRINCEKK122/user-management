import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { users } from "../data/users";
import { addUser } from "../data/UserReducer";
import { useNavigate, useParams } from "react-router-dom";

const { Label, Control, Group, Select } = Form;

export default function UserForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const roles = ["admin", "moderator", "user"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
        const existingUser = users.find(u => u.id === Number(id));
        setUser(u => ({...u, ...existingUser}));
        console.log(user);
    } else {
        dispatch(addUser({ ...user, id: users.total + 1 }));
        navigate(`/users/${localStorage.getItem(user.id)}`);
    }
  };
  return (
    <Form className="container mt-3 w-25" onSubmit={handleSubmit}>
      <Group className="mb-3" controlId="firstNameId">
        <Label className="fw-light">First Name</Label>
        <Control
          type="text"
          placeholder="Enter first name"
          value={user.firstName}
          onChange={(e) =>
            setUser((u) => ({ ...u, firstName: e.target.value }))
          }
        />
      </Group>

      <Group className="mb-3" controlId="lastNameId">
        <Label className="fw-light">Last Name</Label>
        <Control
          type="text"
          placeholder="Enter last name"
          value={user.lastName}
          onChange={(e) => setUser((u) => ({ ...u, lastName: e.target.value }))}
        />
      </Group>

      <Group className="mb-3" controlId="emailId">
        <Label className="fw-light">Email</Label>
        <Control
          type="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))}
        />
      </Group>

      <Group className="mb-3" controlId="usernameId">
        <Label className="fw-light">Username</Label>
        <Control
          type="text"
          placeholder="Enter username"
          value={user.username}
          onChange={(e) => setUser((u) => ({ ...u, username: e.target.value }))}
        />
      </Group>

      <Group className="mb-3" controlId="passwordId">
        <Label className="fw-light">Password</Label>
        <Control
          type="password"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) => setUser((u) => ({ ...u, password: e.target.value }))}
        />
      </Group>

      <Group className="mb-3" controlId="roleId">
        <Label className="fw-light">Select a role:</Label>
        <Select
          value={user.role}
          onChange={(e) => setUser((u) => ({ ...u, role: e.target.value }))}
        >
          {roles.map((role, index) => (
            <option key={index + 1} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </Group>

      <Group className="d-grid">
        <Button size="lg" type="submit">
          Submit
        </Button>
      </Group>
    </Form>
  );
}
