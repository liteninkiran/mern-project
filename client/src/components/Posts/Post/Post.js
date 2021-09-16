import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
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

    return (

        // Card
        <Card className={ classes.card }>

            {/* Image (Title on linger) */}
            <CardMedia className={ classes.media } image={ post.selectedFile } title={ post.title } />

            {/* Created */}
            <div className={ classes.overlay }>
                <Typography variant="h6">{ post.name }</Typography>
                <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
            </div>

            {/* Edit Ellipsis */}
            <div className={ classes.overlay2 }>
                <Button style={ { color: 'white' } } size="small" onClick={ () => setCurrentId(post._id) }>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>

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

            {/* Like / Delete */}
            <CardActions className={ classes.cardActions }>

                {/* Like */}
                <Button size="small" color="primary" onClick={ () => dispatch(likePost(post._id)) } disabled={!user?.result}>
                    <Likes />
                </Button>

                {/* Delete */}
                <Button size="small" color="primary" onClick={ () => dispatch(deletePost(post._id)) }>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>

            </CardActions>

        </Card>
    );
}

export default Post;
