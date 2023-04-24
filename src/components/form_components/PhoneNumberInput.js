import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
// import 'react-phone-input-2/lib/style.css';
// import '../../assets/css/PhoneInput.css';
import 'react-phone-input-2/lib/material.css';
// import '../assets/css/PhoneNumberInput.css';
import '../assets/css/PhoneInput.css';

const PhoneNumberInput = ({ control, name, error, message }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    let inputStyle = !isFocused
        ? { height: '41.125px', width: '100%', fontSize: '14px', borderColor: '#D9D9D9' }
        : { height: '41.125px', width: '100%', fontSize: '14px', border: '1px solid #69C0FF' };
    const countryList = document.querySelector('.country-list');
    /*  React.useEffect(() => {
        function wrap(el, wrapper) {
            el.parentNode.insertBefore(wrapper, el);
            wrapper.appendChild(el);
            wrapper.setAttribute('id', 'wrapper');
        }
        if (countryList) wrap(document.querySelector('.country-list'), document.createElement('ul'));
    }, [countryList]); */

    const flagDropDown = document.querySelector('.flag-dropdown');

    if (countryList) countryList.style = { position: 'absolute' };

    const label = document.querySelector('.special-label');

    if (error) {
        if (flagDropDown) flagDropDown.style.borderColor = '#dc3545';
        if (label) label.style.color = '#dc3545';
        inputStyle.borderColor = '#ff4d4f';
        inputStyle.color = '#ff4d4f';
    }
    if (!error) {
        if (flagDropDown) flagDropDown.style.borderColor = '#d9d9d9';
        if (label) label.style.color = '#656565';
    }

    const focusHandler = () => {
        setIsFocused(true);
    };
    const blurHandler = () => {
        setIsFocused(false);
    };

    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, ...field }, formState: { errors } }) => (
                    <PhoneInput
                        {...field}
                        containerStyle={{ marginTop: '8px', height: '41.125px' }}
                        value={value}
                        onChange={onChange}
                        error={!!errors[name]}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                        helperText={!!errors[name] && message}
                        inputStyle={inputStyle}
                        // value={value}
                        country="az"
                        dropdownStyle={{ height: '120px', marginTop: '0px', fontSize: '14px' }}
                    />
                )}
            />
            {error && (
                <div style={{ display: 'block', font: 'Public Sans', fontSize: '12px', lineHeight: '20px', color: '#ff4d4f' }}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default PhoneNumberInput;
