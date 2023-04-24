import { createSlice } from '@reduxjs/toolkit';

const checkToken = () => {
    const token = localStorage.getItem('token');
    return token;
};

const initialState = {
    isLoggedIn: !!checkToken(),
    status: { code: false, message: 'Fill in the blanks down', firstLoad: true },
    token: checkToken()
};

const auth = createSlice({
    name: 'auth',
    initialState: initialState,

    reducers: {
        login: (state, action) => {
            console.log(action);
            const { token } = action.payload;
            console.log(token);

            localStorage.setItem('token', token);

            return {
                isLoggedIn: true,
                status: state.status,
                token: token
            };
        },

        logout: () => {
            console.log('logout');
            localStorage.removeItem('token');
            return {
                isLoggedIn: false,
                status: initialState.status,
                token: null
            };
        },

        setStatus: (state, action) => {
            return {
                isLoggedIn: state.isLoggedIn,
                status: { ...state.status, ...action.payload },
                token: state.token
            };
        }
    }
});

export const { login, logout, setStatus } = auth.actions;
export default auth.reducer;
