import { useSelector } from "react-redux";

export default function UsersList() {
 const users = useSelector((state) => state.users);

    console.log(users);

    return <h1>List of all users</h1>
}