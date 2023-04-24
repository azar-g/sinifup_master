import axios from 'axios';
// import { store } from 'store/index';
// import { BASE_URL } from 'config';

export const callApi = (apiId, data, isAsync = true) => {
    // const { token } = store.getState().auth;
    const response = axios
        .post(`/api/${apiId}`, {
            ...data
            // cookie: token
        })
        .then((res) => res.data);
    return response;
};
