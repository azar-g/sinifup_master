import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    parentsList: []
};

const parents = createSlice({
    name: 'parents',
    initialState: initialState,
    reducers: {
        loadAllParents: (state, action) => {
            // console.log(action.payload);
            const enumeratedList = action.payload.map((object, index) => {
                return { ...object, num: index + 1 };
            });
            return {
                parentsList: [...enumeratedList]
            };
        },

        addNewParent: (state, action) => {
            // console.log(action.payload);
            const enumaretedData = {
                ...action.payload,
                num: state.parentsList.length + 1,
                newAdded: true
            };
            const newParentAddedList = [enumaretedData, ...state.parentsList];
            return { parentsList: [...newParentAddedList] };
        }
    }
});

export const { loadAllParents, addNewParent } = parents.actions;

export default parents.reducer;
