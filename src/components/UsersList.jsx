import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../data/UserReducer";
import CustomModal from "./CustomModal";

export default function UsersList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [logoutModal, setLogoutModal] = useState(false);
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting the last key in the local storage
  const userId = localStorage.key(localStorage.length - 1);

  const { firstName, image } = JSON.parse(localStorage.getItem(userId));
  const style = { cursor: "pointer" };

  const handleClose = () => {
    setSelectedUserId(-1);
    setShowModal(false);
  };
  const handleShow = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
    handleClose();
  };

  const modalOptions = {
    title: "Delete User",
    body: `Are you sure you want delete this user with ID ${selectedUserId}?`,
    footerBtns: [
      {
        label: "Cancel",
        variant: "secondary",
        onClick: handleClose,
      },
      {
        label: "Yes",
        variant: "danger",
        onClick: () => handleDelete(selectedUserId),
      },
    ],
  };

  const logoutOptions = {
    title: "Log out",
    body: "Is sad to see you go, are you sure you want to logout?",
    footerBtns: [
      {
        label: "No",
        variant: "secondary",
        onClick: () => setLogoutModal(false),
      },
      {
        label: "Yes",
        variant: "primary",
        onClick: () => {
          setLogoutModal(false);
          navigate("/");
        },
      },
    ],
  };

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <div className="container">
      <div className="mt-2 d-flex justify-content-end align-items-center">
        <img
          src={image}
          alt={`Display pic of ${firstName}`}
          style={{ width: 50, height: 50 }}
        />
        <span className="fs-4 fw-light mx-2">Welcome, {firstName}!</span>
        <Button
          variant="outline-secondary"
          onClick={() => setLogoutModal(true)}
        >
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
            <th scope="col">ID</th>
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
              <td>{user.id}</td>
              <td>
                {capitalizeFirstLetter(user.firstName)}{" "}
                {capitalizeFirstLetter(user.lastName)}
              </td>
              <td>{user.email.toLowerCase()}</td>
              <td>{user.username.toLowerCase()}</td>
              <td>{user.role.toUpperCase()}</td>
              <td>
                <Link to={`/users/update/${user.id}`}>
                  <i className="bi bi-pen text-primary me-2" style={style}></i>
                </Link>
                <i
                  className="bi bi-trash3 text-danger"
                  style={style}
                  onClick={() => {
                    handleShow(user.id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomModal
        showModal={showModal}
        options={modalOptions}
        handleClose={handleClose}
      />

      {logoutModal && (
        <CustomModal
          showModal={logoutModal}
          options={logoutOptions}
          handleClose={() => setLogoutModal(false)}
        />
      )}
    </div>
  );
}
