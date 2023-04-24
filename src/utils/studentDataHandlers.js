// import store from "../store/store";
import { convertDataForTable } from './dateHandler';
import { formatDateForEdit, formatDateForApi, formatDateForTable } from './dateHandler';

const handleParentDataForTable = (data) => {
    // const nameSplit = data.split(',');
    // const newArr = nameSplit.map((name) => name.trim());
    // return newArr.join(',');
    return data;
};

export const prepareDataForStudentsList = (data) => {
    // console.log(data);
    const handledData = data.map((obj) => {
        return {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            parent: obj.parent,
            fkParentId: handleParentDataForTable(obj.fkParentId),
            class: obj.class,
            fkClassId: obj.fkClassId,
            phoneNumber: obj.phoneNumber,
            address: obj.address,
            dateOfBirth: formatDateForTable(obj.dateOfBirth),
            id: obj.id
        };
    });
    return handledData;
};

export const prepareNewStudentData = (data) => {
    const date = convertDataForTable(data.dateOfBirth);
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        // parent: parentsList.find((obj) => obj.id === data.fkParentId)?.id,
        // class: classes.find((obj) => obj.value === data.fkClassId)?.value,
        fkClassId: data.fkClassId,
        fkParentId: data.fkParentId,
        parent: data.parent,
        class: data.class,
        id: data.id,
        address: data.address,
        dateOfBirth: date,
        phoneNumber: data.phoneNumber
    };
};

export const studentFormDataHandler = (data) => {
    // console.log(data);
    const dateOfBirth = formatDateForApi(data.dateOfBirth);
    // const fkParentId = data.parent.map((obj) => obj.id).join(',');
    const fkClassId = '56565666565';
    const citizenship = data.citizenship.label;
    return { ...data, dateOfBirth, /* fkParentId,  */ fkClassId, citizenship };
};

export const getDefaultValues = (data) => {
    const dateOfBirth = formatDateForEdit(data.dateOfBirth);
    return { ...data, class: data.fkClassId, dateOfBirth };
};
