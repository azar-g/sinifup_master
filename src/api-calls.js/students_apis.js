import { prepareDataForStudentsList, prepareNewStudentData } from '../utils/studentDataHandlers';
import { loadAllStudents, addNewStudent } from 'store/reducers/students';
import { callApi } from './callApi';
import { store } from 'store/index';

export const fetchAllStudents = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    callApi('getAllStudents', {})
        .then((res) => {
            if (!res) return;
            console.log(res);
            const { students } = res;
            if (!students) return;
            const studentsList = prepareDataForStudentsList(students);
            // console.log(studentsList);
            store.dispatch(loadAllStudents(studentsList));
        })
        .catch((err) => console.log(err));
    // }, [dispatch]);
};

export const registerNewStudent = async (data) => {
    const response = await callApi('insertStudent', data);
    fetchAllStudents();
    console.log(response);
    const newStudent = prepareNewStudentData(response.kv);
    store.dispatch(addNewStudent(newStudent));
    return response.kv;
};

export const updateStudent = async (data) => {
    await callApi('AAupdateApiForStudent', data);
    fetchAllStudents();
};

export const deleteStudent = async (id) => {
    await callApi('AAdeleteApiForStudent', { id });
    fetchAllStudents();
};
