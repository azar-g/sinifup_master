import { callApi } from './callApi';
import { loadSchoolClasses } from 'store/reducers/classes';
import { store } from 'store/index';

export const fetchSchoolClasses = () => {
    callApi('AAgetInfoClassJSON', {})
        .then((res) => {
            if (!res) return;
            const data = res.tbl[0]?.r; // array of all classes
            if (!data) return;

            store.dispatch(loadSchoolClasses(data));
        })
        .catch((err) => console.log(err));
};
