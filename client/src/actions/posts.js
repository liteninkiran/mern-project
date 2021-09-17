import * as api from '../api/index.js';
import { FETCH_ALL, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_POST } from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        // Get posts
        const { data } = await api.fetchPosts(page);
        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        // Get post
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        // Get posts
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};
