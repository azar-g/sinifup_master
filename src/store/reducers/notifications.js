import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: []
};

const notifications = createSlice({
    name: 'notifications',
    initialState: initialState,
    reducers: {
        setNotifications: (state, action) => {
            // console.log(state);
            return {
                notifications: [...state.notifications, ...action.payload]
            };
        }
    }
});

export const { getNotifications, setNotifications } = notifications.actions;

export default notifications.reducer;
