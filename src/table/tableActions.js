import { Box, CircularProgress, Fab, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save, Delete, Edit } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const TableActions = ({ params, rowId, setRowId }) => {
    // console.log(params.id);
    // console.log(rowId);
    // console.log(params);
    // console.log(rowId);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        console.log(params.row);
        setTimeout(() => {
            console.log('timeout');
            setSuccess(true);
            setRowId(null);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        if (rowId === params.id && success) {
            console.log('useeffect');
            setSuccess(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowId]);

    return (
        <Box
            sx={{
                m: 1,
                position: 'relative'
            }}
        >
            {success ? (
                <Fab
                    color="primary"
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: green[500],
                        '&:hover': { bgcolor: green[700] }
                    }}
                >
                    <Check />
                </Fab>
            ) : (
                <Fab
                    color="primary"
                    sx={{
                        width: 40,
                        height: 40
                    }}
                    disabled={params.id !== rowId || loading}
                    onClick={handleSubmit}
                >
                    <Save />
                </Fab>
            )}
            <Tooltip title="Edit this room">
                <IconButton onClick={() => {}}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete this room">
                <IconButton onClick={() => {}}>
                    <Delete />
                </IconButton>
            </Tooltip>
            {loading && (
                <CircularProgress
                    size={52}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1
                    }}
                />
            )}
        </Box>
    );
};

export default TableActions;
