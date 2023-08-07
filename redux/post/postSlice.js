import { createSlice, nanoid } from "@reduxjs/toolkit";

const initPosts = {
    postsList: [
    {
        "id": "id-1",
        "title": "Ліс",
        "comments": "0",
        "likes": "153",
        "photoLocation": "Ukraine",
        "photo": "../../assets/images/forest.jpg",
    },
    {
        "id": "id-2",
        "title": "Захід на Чорному морі",
        "comments": "3",
        "likes": "200",
        "photoLocation": "Ukraine",
        "photo": "../../assets/images/black-sea.jpg",
    },
    {
        "id": "id-3",
        "title": "Старий будиночок у Венеції",
        "comments": "50",
        "likes": "200",
        "photoLocation": "Italy",
        "photo": "../../assets/images/house.jpg",
    }
    ]}

export const postSlice = createSlice({
    name: "posts",
    initialState: initPosts,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.postsList.push(action.payload);
            },
            prepare(title, photoLocation, photo, geoLocation) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        photoLocation,
                        photo,
                        geoLocation
                    },
                };
            },
        },
        deletePost(state, action) {
            const index = state.postsList.findIndex(post => post.id === action.payload);
            state.postsList.splice(index, 1);
        },
    },
});

export const postReducer = postSlice.reducer;
export const { addPost, deletePost } = postSlice.actions;