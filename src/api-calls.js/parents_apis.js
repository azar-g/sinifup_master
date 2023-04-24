// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { loadAllParents, addNewParent } from 'store/reducers/parents';
import { callApi } from './callApi';
import { store } from 'store/index';
import { prepareDataForParentsList, prepareNewParentData } from '../utils/parentDataHandlers';

export const fetchAllParents = () => {
    // useEffect(() => {
    // const fetchData = async () => {
    callApi('getAllParents', {})
        .then((res) => {
            if (!res) return;
            // console.log(res);
            const { parents } = res;
            if (!parents) return;
            const parentsList = prepareDataForParentsList(parents);

            store.dispatch(loadAllParents(parentsList));
        })
        .catch((err) => console.log(err));
    // }, [dispatch, token]);
};
export const registerNewParent = async (data) => {
    // console.log(data);
    const response = await callApi('insertParent', data);
    fetchAllParents();
    console.log(response);
    const newParent = prepareNewParentData(response.kv);
    store.dispatch(addNewParent(newParent));
    return response.kv;
};

export const updateParent = async (data) => {
    await callApi('AAupdateApiForParent', data);
    fetchAllParents();
};

export const deleteParent = async (id) => {
    await callApi('AAdeleteApiForParent', { id });
    fetchAllParents();
};
