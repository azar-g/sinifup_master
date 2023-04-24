import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    studentsList: []
};

const students = createSlice({
    name: 'students',
    initialState: initialState,
    reducers: {
        loadAllStudents: (state, action) => {
            // console.log(action.payload);
            const enumeratedList = action.payload.map((object, index) => {
                return { ...object, num: index + 1 };
            });
            return {
                studentsList: [/* ...state.studentsList,  */ ...enumeratedList]
            };
        },

        addNewStudent: (state, action) => {
            // console.log(action.payload);
            const enumaretedData = {
                ...action.payload,
                num: state.studentsList.length + 1,
                newAdded: true
            };
            const newStudentAddedList = [enumaretedData, ...state.studentsList];
            return { studentsList: [...newStudentAddedList] };
        }

        /*  updateStudent: (state, action) => {
      console.log(action);
      const { value, index } = action.payload;
      console.log(value, index);
      state.studentsList[index] = value;
    }, */
    }
});

export const { loadAllStudents, addNewStudent } = students.actions;

export default students.reducer;
