import { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
// import CancelIcon from '@mui/icons-material/Cancel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {
    DataGrid,
    gridClasses,
    GridToolbar /*  gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector  */
} from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { fetchAllParents } from 'api-calls.js/parents_apis';
import { useSelector } from 'react-redux';
import RowMenuActions from 'table/RowMenuActions';
import ParentForm from 'components/form_cards/ParentForm';
import { openModal } from 'components/popup_components/modal/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ParentsList = () => {
    const { parentsList } = useSelector((state) => state.parents);
    const [pageSize, setPageSize] = useState(10);
    const [rowAction, setRowAction] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    console.log(selectedRows);

    // debugger;
    useEffect(() => {
        fetchAllParents();
    }, []);

    useEffect(() => {
        if (rowAction && rowAction.type === 'edit') {
            const rowData = parentsList.find((parent) => parent.id === rowAction.id);
            openModal({ title: 'Edit Parent Data', data: rowData, form: ParentForm });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowAction]);

    const rowMenu = useMemo(
        () => [
            {
                title: 'Edit',
                icon: <EditIcon />
            },
            {
                title: 'Delete',
                icon: <DeleteIcon />
            }
        ],
        []
    );

    const Parents_Columns = useMemo(
        () => [
            { field: 'num', headerName: '#', width: 30 },
            {
                field: 'firstName',
                headerName: 'First name',
                width: 100,
                editable: true
            },
            {
                field: 'middleName',
                headerName: 'Middle name',
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
            {
                field: 'children',
                headerName: 'Children',
                width: 180,
                editable: true
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
        [rowMenu]
    );

    return (
        <>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                    {/* <Button variant="outlined" startIcon={<CancelIcon />}>
                        Cancel
                    </Button> */}
                    <Button
                        onClick={() => openModal({ title: 'Add Parent', form: ParentForm })}
                        variant="contained"
                        endIcon={<GroupAddIcon />}
                    >
                        Add
                    </Button>
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
                        rows={parentsList}
                        columns={Parents_Columns}
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
                    setRowId(params.id);
                }} */
                        /* onRowClick={(params) => {
                    console.log(params);
                }} */
                        onCellClick={(params) => {
                            // console.log(params);
                        }}
                    />
                </Box>
            </Stack>
            {/* <StudentForm /> */}
        </>
    );
};

export default ParentsList;
