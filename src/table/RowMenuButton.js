import { Box, IconButton, Tooltip } from '@mui/material';
// import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const RowMenuButton = ({ params }) => {
    const editMenu = () => {
        console.log(params);
        console.log('menu');
    };

    return (
        <Box
            sx={{
                m: 1
            }}
        >
            <Tooltip title="Edit this room">
                <IconButton onClick={editMenu}>
                    <MenuIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default RowMenuButton;
