import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    classes: []
};

export const classes = createSlice({
    name: 'classes',
    initialState: initialState,
    reducers: {
        loadSchoolClasses: (state, action) => {
            return {
                classes: [...action.payload]
            };
        }
    }
});

export const { loadSchoolClasses } = classes.actions;

export default classes.reducer;
