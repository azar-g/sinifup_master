import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
    DataGrid,
    gridClasses,
    GridToolbar /*  gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector  */
} from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { fetchAllStudents } from 'api-calls.js/students_apis';
import { fetchAllParents } from 'api-calls.js/parents_apis';
import { useSelector } from 'react-redux';
import { fetchSchoolClasses } from 'api-calls.js/classes_apis';
import RowMenuActions from 'table/RowMenuActions';
import StudentForm from 'components/form_cards/StudentForm';
import { openModal } from 'components/popup_components/modal/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import { prepareEditData } from 'utils/prepareData';

const StudentsList = () => {
    const { studentsList } = useSelector((state) => state.students);
    const { classes } = useSelector((state) => state.classes);
    const [pageSize, setPageSize] = useState(10);
    const [rowAction, setRowAction] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    console.log(selectedRows);

    useEffect(() => {
        fetchAllStudents();
        fetchSchoolClasses();
        fetchAllParents();
    }, []);

    useEffect(() => {
        if (rowAction && rowAction.type === 'edit') {
            const rowData = studentsList.find((student) => student.id === rowAction.id);
            // const data = prepareEditData(rowData);
            openModal({ title: 'Edit Student Data', data: rowData, form: StudentForm });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowAction]);

    // console.log(classes);

    const rowMenu = useMemo(
        () => [
            {
                title: 'Edit',
                icon: <EditIcon />
            },
            {
                title: 'Delete',
                icon: <DeleteIcon />
            },
            {
                title: 'Withdraw',
                icon: <LogoutIcon />
            },
            {
                title: 'Upgrade',
                icon: <MoveUpIcon />
            },
            {
                title: 'Graduate',
                icon: <SchoolIcon />
            },
            {
                title: 'Details',
                icon: <ManageAccountsIcon />
            }
        ],
        []
    );

    const Students_Columns = useMemo(
        () => [
            { field: 'num', headerName: '#', width: 30 },
            {
                field: 'firstName',
                headerName: 'First name',
                width: 100,
                editable: true
            },
            {
                field: 'lastName',
                headerName: 'Last name',
                width: 100,
                editable: true
            },
            {
                field: 'email',
                headerName: 'Email',
                width: 200,
                editable: true
            },
            /*  {
                field: 'parent',
                headerName: 'Parent',
                width: 150,
                editable: true
            }, */
            {
                field: 'class',
                headerName: 'Class',
                width: 120,
                editable: true,
                type: 'singleSelect',
                valueOptions: () => classes.map((obj) => obj.label)
            },
            {
                field: 'id',
                headerName: 'Id',
                width: 190,
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
                width: 140,
                editable: true
            },
            /* {
                field: 'fullName',
                headerName: 'Full name',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
                valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
            }, */
            {
                field: 'menu',
                headerName: 'Menu',
                type: 'actions',
                width: 70,
                renderCell: (params) => <RowMenuActions {...{ params, setRowAction, rowMenu }} />
            }
        ],
        [classes, rowMenu]
    );

    return (
        <>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={1}>
                    <Button
                        onClick={() => openModal({ title: 'Add Student', form: StudentForm })}
                        variant="contained"
                        endIcon={<GroupAddIcon />}
                    >
                        Add
                    </Button>
                    {selectedRows.length > 0 && (
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" onClick={() => setSelectedRows([])} startIcon={<LogoutIcon />}>
                                Withdraw
                            </Button>
                            <Button variant="outlined" startIcon={<MoveUpIcon />}>
                                Upgrade
                            </Button>
                            <Button variant="outlined" startIcon={<SchoolIcon />}>
                                Graduate
                            </Button>
                        </Stack>
                    )}
                </Stack>

                <Box sx={{ height: 770, width: '100%' }}>
                    <DataGrid
                        // sx={{
                        //     boxShadow: 2,
                        //     border: 2,
                        //     borderColor: 'primary.light',
                        //     '& .MuiDataGrid-cell:hover': {
                        //         color: 'primary.main'
                        //     }
                        // }}
                        components={{
                            Toolbar: GridToolbar
                            // Pagination: CustomPagination
                        }}
                        rows={studentsList}
                        columns={Students_Columns}
                        rowsPerPageOptions={[5, 10, 20]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        getRowSpacing={(params) => ({
                            top: params.isFirstVisible ? 0 : 3,
                            bottom: params.lastVisible ? 0 : 3
                        })}
                        // checkboxSelection
                        disableSelectionOnClick
                        checkboxSelection={true}
                        onSelectionModelChange={(row) => setSelectedRows(row)}
                        selectionModel={selectedRows}
                        autoHeight
                        sx={{
                            fontSize: '14px',
                            boxShadow: 2,
                            border: 2,
                            borderColor: '#8c8c8c',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main'
                            },
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => (theme.palette.mode === 'light?' ? grey[900] : grey[200])
                            }
                        }}
                        /* onCellEditCommit={(params) => {
                            // setRowId(params.id);
                            console.log(params);
                        }} */
                        /* onRowClick={(params) => {
                            console.log(params);
                        }} */
                        /* onCellClick={(params) => {
                            console.log(params);
                        }} */
                    />
                </Box>
            </Stack>
            {/* <StudentForm /> */}
        </>
    );
};

export default StudentsList;
