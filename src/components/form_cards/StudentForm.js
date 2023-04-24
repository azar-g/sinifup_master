import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormButtons from '../form_components/FormButtons';
import { Input } from 'components/form_components/Input';
import { useSelector } from 'react-redux';
import { closeModal } from 'components/popup_components/modal/Modal';
import { fetchAllParents } from 'api-calls.js/parents_apis';
import { fetchSchoolClasses } from 'api-calls.js/classes_apis';
import MultiCreatableSelect from 'components/form_components/MultiCreatableSelect';
import PhoneNumberInput from 'components/form_components/PhoneNumberInput';
import DateInput from 'components/form_components/DateInput';
import CountrySelect from 'components/form_components/CountrySelect';
import { getDefaultValues, studentFormDataHandler } from 'utils/studentDataHandlers';
import { registerNewStudent } from 'api-calls.js/students_apis';
// import { updateStudent } from 'api-calls.js/students_apis';
import ParentForm from './ParentForm';

const StudentForm = ({ __mid }) => {
    // const { token } = useSelector((state) => state.auth);
    const [action, setAction] = React.useState('create');
    useEffect(() => {
        fetchAllParents(); // ---> calling API for fetching parents data
        fetchSchoolClasses();
    }, []);

    const { parentsList } = useSelector((state) => state.parents);
    const { classes } = useSelector((state) => state.classes);
    // console.log(classes);
    const parentsNames = parentsList.map((data) => {
        return {
            label: `${data.firstName} ${data.lastName}/ ${data.email}`,
            id: data.id
        };
    });

    const { editData } = useSelector((state) => state.modal.modals.find((modal) => modal.id === __mid));

    useEffect(() => {
        editData && setAction('edit');
        // console.log(editData);
    }, [editData]);

    const [checkboxChecked, setCheckboxChecked] = React.useState(editData ? true : false);

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        // middleName: yup.string().required(),
        email: yup.string().email('Enter valid email').required(),
        // parent: yup.array()/* .required() */,
        // class: yup.string()/* .required() */,
        // phoneNumber: yup.string().required(),
        // address: yup.string().required(),
        // // studentID: yup.string().min(4).max(12),
        dateOfBirth: yup.string().required()
        // citizenship: yup.string()
    });
    const resetValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            middleName: '',
            email: '',
            parent: '',
            class: '',
            studentID: '',
            address: '',
            dateOfBirth: '',
            phoneNumber: '+994',
            citizenship: ''
        };
    }, []);

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful }
    } = useForm({
        defaultValues: editData && getDefaultValues(editData),
        resolver: yupResolver(schema)
    });
    // console.log(errors);
    //
    useEffect(() => {
        isSubmitSuccessful && console.log('submit is sucessfull');
        if (isSubmitSuccessful) reset(resetValues);
    }, [isSubmitSuccessful, reset, resetValues]);

    const submitHandler = (data) => {
        console.log(data);
        const handledData = studentFormDataHandler(data);
        console.log(handledData);
        action === 'create' && registerNewStudent(handledData);
        // action === 'edit' && updateStudent({ ...handledData, id: editData.id });
        checkboxChecked && closeModal(__mid);
    };
    return (
        <Box key={__mid}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Grid container rowSpacing={5} columnSpacing={3}>
                    {/* First Name */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Input
                            type="text"
                            name={'firstName'}
                            label="First Name"
                            control={control}
                            error={errors.firstName ? true : false}
                            message={'Fill in the first name'}
                            autoComplete="off"
                            fullWidth
                            multiline={false}
                            select={false}
                            size="normal"
                        />
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Input
                            type="text"
                            name={'lastName'}
                            label="Last Name"
                            control={control}
                            error={errors.lastName ? true : false}
                            message={'Fill in the last name'}
                            autoComplete="off"
                            fullWidth
                            multiline={false}
                            select={false}
                            size="normal"
                        />
                    </Grid>

                    {/* Middle Name */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Input
                            type="text"
                            name={'middleName'}
                            label="Middle Name"
                            control={control}
                            error={errors.middleName ? true : false}
                            message={'Fill in the first name'}
                            autoComplete="off"
                            fullWidth
                            multiline={false}
                            select={false}
                            size="normal"
                        />
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Input
                            type="email"
                            name={'email'}
                            label="Email"
                            control={control}
                            error={errors.email ? true : false}
                            message={'Email is required'}
                            autoComplete="off"
                            fullWidth
                            multiline={false}
                            select={false}
                            size="normal"
                        />
                    </Grid>

                    {/* Parent */}
                    <Grid item xs={12} sm={6} md={4}>
                        <MultiCreatableSelect
                            name="parent"
                            label="Parent/Guardian"
                            modal={{ title: 'Add Parent', form: ParentForm }}
                            control={control}
                            // options={options}
                            options={parentsNames}
                            buttonTitle="Add New Parent"
                            error={errors.parent}
                            message={'Select or add parent'}
                        />
                    </Grid>

                    {/* Class */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Input
                            type="text"
                            name="class"
                            label="Class"
                            control={control}
                            error={errors.class}
                            message={'Select the class'}
                            autoComplete="off"
                            fullWidth
                            multiline={false}
                            select={true}
                            size="normal"
                            options={classes}
                            // editdata={editData?.fkClassId}
                        />
                    </Grid>

                    {/* Phone Input */}
                    <Grid item xs={12} sm={6} md={4}>
                        <PhoneNumberInput
                            name="phoneNumber"
                            label="Phone"
                            control={control}
                            error={!!errors.phoneNumber}
                            message={'Select or add parent'}
                        />
                    </Grid>

                    {/* Citizenship */}
                    <Grid item xs={12} sm={6} md={4}>
                        <CountrySelect
                            name="citizenship"
                            label="Citizenship"
                            control={control}
                            // error={!!errors.citizenship}
                            message={'Select a country'}
                        />
                    </Grid>

                    {/* Date of Birth */}
                    <Grid item xs={12} sm={6} md={4}>
                        <DateInput
                            name="dateOfBirth"
                            label="Date of Birth"
                            control={control}
                            error={!!errors.dateOfBirth}
                            message={'Enter the birth date'}
                            // editdata={editData?.dateOfBirth}
                        />
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Input
                            type="text"
                            name={'address'}
                            label="Address"
                            control={control}
                            error={errors.address ? true : false}
                            message={'Fill in the address'}
                            autoComplete="off"
                            fullWidth
                            multiline={true}
                            select={false}
                            size="normal"
                        />
                    </Grid>
                </Grid>

                <FormButtons
                    id={__mid}
                    checked={checkboxChecked}
                    setChecked={action === 'create' && (() => setCheckboxChecked((prevState) => !prevState))}
                />
            </form>
        </Box>
    );
};

export default StudentForm;

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

/* const validationSchema = Yup.object().shape({
    userId: Yup.string().required('User ID is required').min(6, 'User ID must be at least 6 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid.'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
}); */
