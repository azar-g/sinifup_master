import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const CheckButton = ({ checked, changeState }) => {
    // const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        event && changeState && changeState();
    };

    return <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />;
};

export default CheckButton;
