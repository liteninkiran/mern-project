import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import ChatSection from './ChatSection';
import useStyles from './styles';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    const openPost = (_id) => history.push(`/posts/${_id}`);

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    let recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (

        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>

            <div className={classes.card}>

                {/* Post Details */}
                <div className={classes.section}>

                    {/* Title */}
                    <Typography variant="h3" component="h2">{post.title}</Typography>

                    {/* Tags */}
                    <Typography  className={classes.postTags} variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>

                    {/* Message */}
                    <Typography className={classes.postMessage} variant="body1" component="p">{post.message}</Typography>

                    {/* Created By */}
                    <Typography variant="h6">Created By:</Typography>

                    {/* Created At */}
                    <Typography variant="body1">{post.name}, {moment(post.createdAt).fromNow()}</Typography>

                    <Divider style={{ margin: '20px 0' }} />

                    {/* Realtime chat */}
                    <ChatSection />
                    <Divider style={{ margin: '20px 0' }} />

                    {/* Comments */}
                    <CommentSection post={post} />
                    <Divider style={{ margin: '20px 0' }} />

                </div>

                {/* Post Image */}
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>

            </div>

            {/* Recommended Posts */}
            {!!recommendedPosts.length && (
                <div className={classes.section}>

                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />

                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <img src={selectedFile} width="200px" alt="Alt" />
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                            </div>
                        ))}
                    </div>

                </div>
            )}
 
        </Paper>

    );
};

export default PostDetails;
