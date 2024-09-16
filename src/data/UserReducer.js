import { createSlice } from "@reduxjs/toolkit";
import { users } from "./users";

const userSlice = createSlice({
  name: "users",
  initialState: users.users,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, firstName, lastName, email, username, role } = action.payload;

      const updatedUser = state.find((u) => u.id === id);
      if (updatedUser) {
        updatedUser.firstName = firstName;
        updatedUser.lastName = lastName;
        updatedUser.email = email;
        updatedUser.username = username;
        updatedUser.role = role;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const user = state.find((u) => u.id === id);
      if (user) {
        return state.filter(u => u.id !== id);
      }
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
