import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { openModal } from 'components/popup_components/modal/Modal';
import { Controller } from 'react-hook-form';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const filter = createFilterOptions();

export default function MultiCreatableSelect({ name, label, modal, options, control, buttonTitle, ...rest }) {
    const defaultOption = {
        label: (
            <Button variant="outlined" size="small" fullWidth onClick={() => openModal(modal)}>
                {buttonTitle}
            </Button>
        ),
        inputValue: `${buttonTitle}`
    };
    const newOptions = [defaultOption, ...options];
    const handleChange = (e, value, onChange) => {
        // console.log(value);
        /* if (typeof value === 'string') {
            onChange({
                label: value
            }); 
        } */
        if (value.length > 0 && value.some((value) => value.inputValue)) {
            // Create a new value from the user input
            onChange(() =>
                value.forEach((value) => {
                    return {
                        label: value.inputValue
                    };
                })
            );
            // openModal(modal);
        } else {
            onChange(value);
        }
    };

    const optionRenderHandler = (props, option) => {
        return (
            <li {...props} key={option.id}>
                {option.label}
            </li>
        );
    };

    const filterOptions = (options, params) => {
        const filtered = filter(options, params);
        // console.log(options);
        const optionsToFilter = options.slice(1);
        // console.log(optionsToFilter);

        if (!filtered.includes(defaultOption)) {
            filtered.unshift(defaultOption);
        }

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = optionsToFilter.some((option) => {
            return option.label.includes(inputValue);
        });
        console.log(isExisting);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                key: Math.floor(Math.random() * 10000000),
                inputValue,
                label: `No Options`
            });
        }

        return filtered;
    };
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ref, ...field }, formState: { errors } }) => (
                <Autocomplete
                    sx={{
                        '& .MuiAutocomplete-inputRoot': {
                            marginTop: '8px'
                        }
                    }}
                    {...rest}
                    value={value || []}
                    onChange={(e, value) => handleChange(e, value, onChange)}
                    filterOptions={filterOptions}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id={`${name}_input`}
                    options={newOptions}
                    multiple
                    blurOnSelect={true}
                    limitTags={2}
                    getOptionLabel={(option) => {
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
                    renderOption={optionRenderHandler}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            // console.log(option);
                            return (
                                <Chip
                                    key={option.id}
                                    avatar={<Avatar key={option.id}>{option.label.slice(0, 1).toUpperCase()}</Avatar>}
                                    variant="filled"
                                    label={option.label.slice(0, 3) + '...'}
                                    size="small"
                                    {...getTagProps({ index })}
                                />
                            );
                        })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...field}
                            // key={Math.floor(Math.random() * 10000000)}
                            label={label}
                            // InputLabelProps={{ shrink: true }}
                            error={!!errors[name]}
                            helperText={!!errors[name] && rest.message}
                            inputRef={ref}
                            sx={{
                                '& input': {
                                    height: '8.125px'
                                },
                                '& endAdornment': {
                                    height: '12px'
                                },
                                '& label': { padding: '0px', marginTop: '8px' }
                            }}
                        />
                    )}
                />
            )}
        />
    );
}
