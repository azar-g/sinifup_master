// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth';
import classes from './classes';
import messages from './messages';
import notifications from './notifications';
import parents from './parents';
import students from './students';
import modal from './modal';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, classes, messages, notifications, parents, students, modal });

export default reducers;
