import { createSlice, nanoid } from "@reduxjs/toolkit";

const posts =  [
    {
        "id": "id-1",
        "title": "Ліс",
        "comments": "0",
        "location": "Ivano-Frankivs'k Region, Ukraine",
        "photo": "./../assets/images/forest.jpg",
    },
    {
        "id": "id-2",
        "title": "Захід на Чорному морі",
        "comments": "3",
        "location": "Ukraine",
        "photo": "./../assets/images/black-sea.jpg",
    },
    {
        "id": "id-3",
        "title": "Старий будиночок у Венеції",
        "comments": "50",
        "location": "Italy",
        "photo": "./../assets/images/house.jpg",
    }
    ]

export const postSlice = createSlice({
    name: "posts",
    initialState: posts,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.postsList.push(action.payload);
            },
            prepare(title, comments, location, photo) {
                return {
                    payload: {
                        id: nanoid(),
                        title, comments, location, photo,
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