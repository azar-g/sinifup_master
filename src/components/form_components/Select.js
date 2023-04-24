// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import { Controller } from 'react-hook-form';
// import Chip from '@mui/material/Chip';
// import Avatar from '@mui/material/Avatar';

// const filter = createFilterOptions();

// export default function Select({ name, label, options, control, ...rest }) {
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({ field: { value, onChange, ...field }, formState: { errors } }) => (
//                 <Autocomplete
//                     {...rest}
//                     value={value || []}
//                     onChange={(event, value) => {
//                         if (typeof value === 'string') {
//                             onChange({
//                                 label: value
//                             });
//                         } else if (value && value.inputValue) {
//                             // Create a new value from the user input
//                             onChange({
//                                 label: value.inputValue
//                             });
//                         } else {
//                             onChange(value);
//                         }
//                     }}
//                     filterOptions={(options, params) => {
//                         const filtered = filter(options, params);

//                         const { inputValue } = params;
//                         // Suggest the creation of a new value
//                         const isExisting = options.some((option) => inputValue === option.label);
//                         if (inputValue !== '' && !isExisting) {
//                             filtered.push({
//                                 inputValue,
//                                 label: `No Option`
//                             });
//                         }

//                         return filtered;
//                     }}
//                     selectOnFocus
//                     clearOnBlur
//                     handleHomeEndKeys
//                     id={`${name}_input`}
//                     options={options}
//                     isOptionEqualToValue={(option, value) => {
//                         console.log(option.id);
//                         console.log(value.id);
//                         return option.id === value.id;
//                     }}
//                     getOptionLabel={(option) => {
//                         // console.log(option);
//                         // Value selected with enter, right from the input
//                         if (typeof option === 'string') {
//                             return option;
//                         }
//                         // Add "xxx" option created dynamically
//                         if (option.inputValue) {
//                             return option.inputValue;
//                         }
//                         // Regular option
//                         return option.label;
//                     }}
//                     renderOption={(props, option) => <li {...props}>{option.label}</li>}
//                     // sx={{ height: '50px' }}
//                     // freeSolo
//                     renderTags={(value, getTagProps) =>
//                         value.map((option, index) => (
//                             <Chip
//                                 avatar={<Avatar>{option.label.slice(0, 1).toUpperCase()}</Avatar>}
//                                 variant="filled"
//                                 label={option.label.slice(0, 3) + '...'}
//                                 size="small"
//                                 {...getTagProps({ index })}
//                             />
//                         ))
//                     }
//                     renderInput={(params) => (
//                         <TextField
//                             {...params}
//                             {...field}
//                             label={label}
//                             // variant="outlined"
//                             size="small"
//                             error={!!errors[name]}
//                             helperText={!!errors[name] && rest.message}
//                             /* sx={{
//                                 '& input': {
//                                     height: '8.125px'
//                                 },
//                                 '& label': { padding: '0px', marginTop: '8px' }
//                             }} */
//                         />
//                     )}
//                 />
//             )}
//         />
//     );
// }

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const filter = createFilterOptions();

export default function MultiCreatableSelect({ name, label, options, control, ...rest }) {
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
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ...field }, formState: { errors } }) => (
                <Autocomplete
                    sx={{
                        '& .MuiAutocomplete-inputRoot': {
                            marginTop: '8px'
                        }
                    }}
                    {...rest}
                    value={value || []}
                    onChange={(e, value) => handleChange(e, value, onChange)}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some((option) => inputValue === option.label);
                        if (inputValue !== '' && !isExisting) {
                            filtered.push({
                                inputValue,
                                label: `No option`
                            });
                        }

                        return filtered;
                    }}
                    // selectOnFocus
                    // clearOnBlur
                    handleHomeEndKeys
                    id={`${name}_input`}
                    options={options}
                    multiple
                    // blurOnSelect={true}
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
                        value.map((option, index) => (
                            <Chip
                                avatar={<Avatar key={option.id}>{option.label.slice(0, 1).toUpperCase()}</Avatar>}
                                variant="filled"
                                label={option.label.slice(0, 3) + '...'}
                                size="small"
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...field}
                            label={label}
                            // InputLabelProps={{ shrink: true }}
                            error={!!errors[name]}
                            helperText={!!errors[name] && rest.message}
                            sx={{
                                '& input': {
                                    height: '8.125px'
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
