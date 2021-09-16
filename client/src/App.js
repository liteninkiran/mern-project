import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));

    return (

        <BrowserRouter>

            <Container maxwidth="lg">

                {/* Navbar */}
                <Navbar />
                
                {/* Home / Auth */}
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/" />)} />
                </Switch>

            </Container>

        </BrowserRouter>
    );
};

export default App;
