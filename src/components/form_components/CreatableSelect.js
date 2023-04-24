import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { openModal } from 'components/popup_components/modal/Modal';
import { Controller } from 'react-hook-form';

const filter = createFilterOptions();

export default function CreatableSelect({ name, label, modal, options, control, ...rest }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ...field }, formState: { errors } }) => (
                <Autocomplete
                    {...rest}
                    value={value ?? ''}
                    onChange={(event, value) => {
                        if (typeof value === 'string') {
                            onChange({
                                label: value
                            });
                        } else if (value && value.inputValue) {
                            // Create a new value from the user input
                            onChange({
                                label: value.inputValue
                            });
                            openModal(modal);
                        } else {
                            onChange(value);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.label);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push({
                                inputValue,
                                label: `Add "${inputValue}"`
                            });
                        }

                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id={`${name}_input`}
                    options={options}
                    getOptionLabel={(option) => {
                        // console.log(option);
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.label;
                    }}
                    renderOption={(props, option) => <li {...props}>{option.label}</li>}
                    // sx={{ height: '50px' }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...field}
                            label={label}
                            // variant="outlined"
                            size="small"
                            error={!!errors[name]}
                            helperText={!!errors[name] && rest.message}
                            /* sx={{
                                label: { marginBottom: '0px' },
                                input: { height: '20.15px' },
                                fieldset: {
                                    height: '45.15px',
                                    paddingTop: '10.5px',
                                    paddingBottom: '10.5px',
                                    marginTop: '0px',
                                    marginBottom: '0px'
                                }
                            }} */
                        />
                    )}
                />
            )}
        />
    );
}

// marginTop: '10.5px', marginBottom: '10.5px'
