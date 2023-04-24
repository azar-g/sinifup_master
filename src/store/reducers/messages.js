import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: []
};

const messages = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        setMessages: (state, action) => {
            return {
                messages: [...state.messages, ...action.payload]
            };
        }
    }
});

export const { setMessages } = messages.actions;

export default messages.reducer;
