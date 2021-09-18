import React from 'react'
import { TextField, IconButton, Grid, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, label, type, autoFocus, half, handleChange, handleShowPassword }) => {

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                type={type}
                autoFocus={autoFocus}
                onChange={handleChange}
                variant="outlined"
                InputProps={name === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton tabIndex="-1" onClick={handleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null }
                fullWidth
                required
            />
        </Grid>
    )
}

export default Input;
