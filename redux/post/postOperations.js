import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const deletePost = (id) => async () => {
    try {
        await deleteDoc(doc(db, "posts", `${id}`));
        return id;
    } catch (e) {
        console.log("e.message", e.message);
    }
};
