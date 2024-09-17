import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../data/UserReducer";
import { useNavigate, useParams, Link } from "react-router-dom";

const { Label, Control, Group, Select } = Form;

export default function UserForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "admin",
  });
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUser = (id) => {
    if (id) {
      const existingUser = users.find((u) => u.id === Number(id));

      if (existingUser) {
        setUser((u) => ({ ...u, ...existingUser }));
      }
    }
  };

  useEffect(() => {
    fetchUser(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, users]);

  const roles = ["admin", "moderator", "user"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      console.log("Editing the user", user);
      dispatch(editUser(user));
    } else {
      console.log(user);
      dispatch(addUser({ ...user, id: users.length + 1 }));
    }
    navigate("/users");
  };

  return (
    <>
      <div className="mt-2 w-25 container">
        <Link to="/users">
          <i className="bi bi-arrow-left fs-3 text-start"></i>
        </Link>
      </div>

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
            onChange={(e) =>
              setUser((u) => ({ ...u, lastName: e.target.value }))
            }
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
            onChange={(e) =>
              setUser((u) => ({ ...u, username: e.target.value }))
            }
          />
        </Group>

        <Group className="mb-3" controlId="passwordId">
          <Label className="fw-light">Password</Label>
          <Control
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) =>
              setUser((u) => ({ ...u, password: e.target.value }))
            }
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
            {id ? "Update" : "Add"} User
          </Button>
        </Group>
      </Form>
    </>
  );
}
