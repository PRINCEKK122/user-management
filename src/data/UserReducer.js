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
        const {id, firstName, lastName, email, username, role} = action.payload;
        const updatedUser = state.find(u => u.id === Number(id));

        if (updatedUser) {
            updatedUser.firstName = firstName;
            updatedUser.lastName = lastName;
            updatedUser.email = email;
            updatedUser.username = username;
            updatedUser.role = role;
        }
    }
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
