import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modals: []
};

const modal = createSlice({
    name: 'modal',
    initialState: initialState,

    reducers: {
        open: (state, action) => {
            console.log(action.payload);
            return {
                modals: [
                    ...state.modals,
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        editData: action.payload.data,
                        form: action.payload.element
                    }
                ]
            };
        },

        close: (state, action) => {
            const modalId = action.payload;
            return {
                modals: state.modals.filter((modal) => modal.id !== modalId)
            };
        }
    }
});

// modals: state.modals.splice(0, -1),

export default modal.reducer;
export const { open, close } = modal.actions;
