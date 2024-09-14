import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function UsersList() {
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const { id } = useParams();

  const { firstName, image } = JSON.parse(localStorage.getItem(Number(id)));
  const style = { cursor: "pointer" };

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
        <Button size="lg" className="mb-2 fw-light">
          <i class="bi bi-plus-lg"></i> ADD USER
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
                <i
                  className="bi bi-pen text-primary me-2"
                  style={style}
                  onClick={() => console.log("editing...")}
                ></i>
                <i
                  className="bi bi-trash3 text-danger"
                  style={style}
                  onClick={() => console.log("deleting")}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
