import { createSlice } from '@reduxjs/toolkit';

export const RoleManager = createSlice({
    name: 'role',
    initialState: {
        userRole: 'DEFAULT',
        userToken: null,
        userId: null,
    },
    reducers: {
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setUserRole, setUserToken, setUserId } = RoleManager.actions;

export const selectUserRole = (state) => state.role.userRole;
export const selectUserToken = (state) => state.role.userToken;
export const selectUserId = (state) => state.role.userId;

export default RoleManager.reducer;