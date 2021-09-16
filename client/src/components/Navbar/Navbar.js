import React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">

            {/* Title & App Icon */}
            <div className={classes.brandContainer}>

                {/* Title */}
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
                    Memories
                </Typography>

                {/* App Icon */}
                <img className={classes.image} src={memories} alt="icon" height="60" />

            </div>

            {/* User Details / Login */}
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>

                            {/* User Icon */}
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>

                            {/* User Name */}
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>

                            {/* Logout Button */}
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>

                        </div>
                    ) : (

                        // Login Button
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

                    )
                }

            </Toolbar>

        </AppBar>
    );
};

export default Navbar;
