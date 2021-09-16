import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPosts } from '../actions/posts';
import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
    }, [dispatch, page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={5} // {numberOfPages}
            page={1} // {Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                // <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />
    );
};

export default Paginate;
