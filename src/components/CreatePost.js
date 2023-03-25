import React from "react";
import { useState } from "react";
import styles from "../styles/home.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth, usePosts } from "../hooks";
import { addPost } from "../api";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const auth = useAuth();
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);
    const responce = await addPost(post);
    if (responce.success) {
      setPost("");
      posts.addPostToState(responce.data.post);
      toast("add post successFully ", {
        apperence: "succes",
      });
    } else {
      toast(responce.message, {
        apperence: "error",
      });
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? "Adding post..." : "Add post"}
          <ToastContainer />
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
