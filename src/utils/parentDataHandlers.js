// import { convertDataForTable } from './dateHandler';
import { formatDateForEdit, formatDateForApi, formatDateForTable } from './dateHandler';

export const prepareDataForParentsList = (data) => {
    const handledData = data.map((obj) => {
        return {
            firstName: obj.firstName,
            middleName: obj.middleName,
            lastName: obj.lastName,
            email: obj.email,
            student: obj.student,
            fkStudentId: obj.fkStudentId,
            phoneNumber: obj.phoneNumber,
            address: obj.address,
            dateOfBirth: formatDateForTable(obj.dateOfBirth),
            id: obj.id
        };
    });
    return handledData;
};

export const prepareNewParentData = (data) => {
    // console.log(data);
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        email: data.email,
        children: data.children?.label,
        id: data.id,
        phoneNumber: data.phoneNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth
    };
};

export const parentFormDataHandler = (data) => {
    console.log(data);
    const dateOfBirth = formatDateForApi(data.dateOfBirth);
    const fkStudentId = data.children?.map((obj) => obj.id).join(',');
    const citizenship = data.citizenship.label;
    return { ...data, dateOfBirth, fkStudentId, citizenship };
};

export const getDefaultValues = (data) => {
    const dateOfBirth = formatDateForEdit(data.dateOfBirth);
    return { ...data, class: data.fkClassId, dateOfBirth };
};
