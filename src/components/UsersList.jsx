import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../data/UserReducer";

export default function UsersList() {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting the last key in the local storage
  const userId = localStorage.key(localStorage.length - 1);

  const { firstName, image } = JSON.parse(localStorage.getItem(userId));
  const style = { cursor: "pointer" };

  const handleDelete = (id) => {
    dispatch(deleteUser({id}));
  }

  return (
    <div className="container">
      <div className="mt-2 d-flex justify-content-end align-items-center">
        <img
          src={image}
          alt={`Display pic of ${firstName}`}
          style={{ width: 50, height: 50 }}
        />
        <span className="fs-4 fw-light mx-2">Welcome, {firstName}!</span>
        <Button variant="outline-secondary" onClick={() => navigate("/")}>
          Logout
        </Button>
      </div>

      <h1 className="mt-3 fw-light text-center ">ALL USERS</h1>
      <div className="d-flex justify-content-end">
        <Button
          size="lg"
          className="mb-2 fw-light"
          variant="outline-success"
          onClick={() => navigate("/users/add")}
        >
          <i className="bi bi-plus-lg"></i> ADD USER
        </Button>
      </div>

      <Table responsive hover borderless>
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role.toUpperCase()}</td>
              <td>
                <Link to={`/users/edit/${user.id}`}>
                  <i className="bi bi-pen text-primary me-2" style={style}></i>
                </Link>
                <i
                  className="bi bi-trash3 text-danger"
                  style={style}
                  onClick={() => handleDelete(user.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
