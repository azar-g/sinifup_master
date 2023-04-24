import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

export function Input({ name, label, control, options, ...rest }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ref }, formState: { errors } }) => (
                <TextField
                    {...rest}
                    sx={{ mt: 1 }}
                    variant="outlined"
                    id={`${name}-input`}
                    label={label}
                    onChange={onChange}
                    value={value ?? ''}
                    inputRef={ref}
                    error={!!errors[name]}
                    helperText={!!errors[name] && rest.message}
                >
                    {options &&
                        options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </TextField>
            )}
        />
    );
}
