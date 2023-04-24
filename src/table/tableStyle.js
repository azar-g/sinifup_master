import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

export const StudentsGridStyle = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#8c8c8c' : '#303030'}`
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none'
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#8c8c8c' : '#303030'}`,
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#8c8c8c' : '#303030'}`
    },

    '& .MuiDataGrid-columnHeader': {
        fontSize: '16px',
        fontWeight: 'bold'
    },
    '& .MuiDataGrid-cell': {
        color: theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
        fontSize: '14px',
        fontWeight: 600
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0
    }
}));
