import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Typography } from '@material-ui/core';

const Posts = ({setCurrentId}) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    if (!posts.length && !isLoading) {
        return (
            <Typography variant="h3">
                No Posts To Display
            </Typography>
        );
    }

    return (

        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                { posts.map((post) => (
                    <Grid key={ post._id } item xs={12} sm={6} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                )) }
            </Grid>
        )

    );
}

export default Posts;
