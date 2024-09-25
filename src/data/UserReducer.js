import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { users } from "./users";

const BASE_URI = "https://dummyjson.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(BASE_URI);
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
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
        return state.filter((u) => u.id !== id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
