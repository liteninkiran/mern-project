import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

import Posts from '../../components/Posts/Posts';
import Form from '../../components/Form/Form';
import Pagination from '../Pagination';

import useStyles from '../../styles';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>

                    {/* Posts */}
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    {/* Create / Edit Form */}
                    <Grid item xs={12} sm={4}>
                        <Form setCurrentId={setCurrentId} currentId={currentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={1} />
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
