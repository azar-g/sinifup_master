export const Students_Columns = [
    { field: 'num', headerName: '#', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true
    },
    {
        field: 'parent',
        headerName: 'Parent',
        width: 150,
        editable: true
    },
    {
        field: 'class',
        headerName: 'Class',
        width: 150,
        editable: true,
        type: 'singleSelect'
        // valueOptions: ['class1', 'class2', 'class3', 'class4']
        // valueOptions: classes
    },
    {
        field: 'id',
        headerName: 'Id',
        width: 150,
        editable: true
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 150,
        editable: true
    },
    {
        field: 'dateOfBirth',
        headerName: 'Date of Birth',
        type: 'date',
        width: 110,
        editable: true
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone',
        width: 110,
        editable: true
    },
    /* {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true
    }, */
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
    }
    // { field: 'actions', headerName: 'Actions', type: 'actions', renderCell:params=> }
];

/* const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];
 */
