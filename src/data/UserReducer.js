import { createSlice } from "@reduxjs/toolkit";
import { users } from "./users";

const userSlice = createSlice({
    name: "users",
    initialState: users.users,
    reducers: {}
});

export default userSlice.reducer;
