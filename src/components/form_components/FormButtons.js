import * as React from 'react';
import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import { closeModal } from 'components/popup_components/modal/Modal';
import CheckButton from './CheckButton';

const FormButtons = ({ id, checked, setChecked }) => {
    // console.log(id);
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" mt={2}>
            <Grid item>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item>
                        <CheckButton checked={checked} changeState={setChecked} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid
                    /* sx={{ display: 'flex', gap: 2 }} */ container
                    columnSpacing={1}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Grid item>
                        <Button type="submit" variant="contained" sx={{}}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => closeModal(id)}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FormButtons;
