import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length > 0) {

            // Check if post has been liked by the logged-in user
            const likedByUser = post.likes.find((like) => like === user?.result?.googleId || user?.result?._id) !== undefined;

            // Singlular or plural like(s)
            const label = post.likes.length === 1 ? 'like' : 'likes';

            // Standard text showing total number of likes
            const standardText = `${post.likes.length} ${label}`;

            // If possible, show more verbose text if user has liked their own post
            const verboseText = post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : standardText;

            return likedByUser ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{verboseText}</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{standardText}</>
            );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }

    const handleDeletePost = () => {
        dispatch(deletePost(post._id));
    };

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    };

    return (

        // Card
        <Card className={ classes.card } raised elevation={6}>

            <ButtonBase className={classes.cardAction} onClick={openPost}>

                {/* Image (Title on linger) */}
                <CardMedia className={ classes.media } image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

                {/* Created */}
                <div className={ classes.overlay }>
                    <Typography variant="h6">{ post.name }</Typography>
                    <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
                </div>

                {/* Edit Ellipsis */}
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2} name="edit">
                    <Button
                        onClick={(e) => {
                        e.stopPropagation();
                        setCurrentId(post._id);
                        }}
                        style={{ color: 'white' }}
                        size="small"
                    >
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                    </div>
                )}

                {/* Tags */}
                <div className={ classes.details }>
                    <Typography variant="body2" color="textSecondary">{ post.tags.map((tag) => `#${tag} `) }</Typography>
                </div>

                {/* Post Title */}
                <Typography className={ classes.title } variant="h5" gutterBottom>{ post.title }</Typography>

                {/* Post Message */}
                <CardContent>
                    <Typography variant="body2">{ post.message }</Typography>
                </CardContent>

            </ButtonBase>

            {/* Like / Delete */}
            <CardActions className={ classes.cardActions }>

                {/* Like */}
                <Button size="small" color="primary" onClick={ () => dispatch(likePost(post._id)) } disabled={!user?.result}>
                    <Likes />
                </Button>

                {/* Delete */}
                {( user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                    <Button size="small" color="primary" onClick={ handleDeletePost }>
                        <DeleteIcon fontSize="small" />Delete
                    </Button>
                )}

            </CardActions>

        </Card>
    );
}

export default Post;
