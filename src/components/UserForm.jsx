import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../data/UserReducer";
import { useNavigate, useParams, Link } from "react-router-dom";

const { Label, Control, Group, Select } = Form;
const { Feedback } = Control;

export default function UserForm() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "admin",
  });
  const [validated, setValidated] = useState(false);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const feedback = (minLength = 3) => {
    return (
      <>
        <Feedback>Looks good!</Feedback>
        <Feedback type="invalid">
          Field is required and should have minimum of {minLength} characters
        </Feedback>
      </>
    );
  };

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
    e.stopPropagation();

    setValidated(true);

    if (e.target.checkValidity()) {
      if (id) {
        dispatch(editUser(user));
      } else {
        const newId = Math.max(...users.map((u) => u.id)) + 1;
        dispatch(addUser({ ...user, id: newId }));
      }
      navigate("/users");
    }
  };

  return (
    <>
      <div className="mt-2 w-25 container">
        <Link to="/users">
          <i className="bi bi-arrow-left fs-3 text-start"></i>
        </Link>
      </div>

      <Form
        noValidate
        validated={validated}
        className="container mt-3 w-25"
        onSubmit={handleSubmit}
      >
        <Group className="mb-3" controlId="firstNameId">
          <Label className="fw-light">First Name</Label>
          <Control
            type="text"
            placeholder="Enter first name"
            value={user.firstName}
            onChange={(e) =>
              setUser((u) => ({ ...u, firstName: e.target.value.trim() }))
            }
            required
            minLength={3}
          />
          {feedback()}
        </Group>

        <Group className="mb-3" controlId="lastNameId">
          <Label className="fw-light">Last Name</Label>
          <Control
            type="text"
            placeholder="Enter last name"
            value={user.lastName}
            required
            minLength={3}
            onChange={(e) =>
              setUser((u) => ({ ...u, lastName: e.target.value.trim() }))
            }
          />
          {feedback()}
        </Group>

        <Group className="mb-3" controlId="emailId">
          <Label className="fw-light">Email</Label>
          <Control
            type="email"
            placeholder="Enter Email"
            value={user.email}
            required
            onChange={(e) => setUser((u) => ({ ...u, email: e.target.value.trim() }))}
          />
          <Feedback>Looks good</Feedback>
          <Feedback type="invalid">Please enter a valid email</Feedback>
        </Group>

        <Group className="mb-3" controlId="usernameId">
          <Label className="fw-light">Username</Label>
          <Control
            type="text"
            placeholder="Enter username"
            value={user.username}
            required
            minLength={5}
            onChange={(e) =>
              setUser((u) => ({ ...u, username: e.target.value }))
            }
          />
          {feedback(5)}
        </Group>

        <Group className="mb-3" controlId="passwordId">
          <Label className="fw-light">Password</Label>
          <Control
            type="password"
            placeholder="Enter password"
            value={user.password}
            required
            minLength={6}
            onChange={(e) =>
              setUser((u) => ({ ...u, password: e.target.value.trim() }))
            }
          />
          {feedback(6)}
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
