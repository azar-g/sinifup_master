import * as React from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

export default function DateInput({ name, label, control, ...rest }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ref }, formState: { errors } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div style={{ marginTop: '8px' }}>
                        <DatePicker
                            inputFormat="DD-MM-YYYY"
                            label="Basic example"
                            value={value ?? null}
                            onChange={(value) => {
                                // console.log(value);
                                onChange(value);
                            }}
                            // defaultValue={new Date()}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{ width: '100%' }}
                                    error={!!errors[name]}
                                    helperText={!!errors[name] && rest.message}
                                />
                            )}
                        />
                    </div>
                </LocalizationProvider>
            )}
        />
    );
}
