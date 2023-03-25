import React, { useEffect, useState } from "react";
import styles from "../styles/settings.module.css";
import { useParams } from "react-router-dom";
import { addFriend, fetchUserProfile, removeFriend } from "../api";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../components";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgres, setrequestInProgres] = useState(false);
  const { userId } = useParams();
  const history = useNavigate();
  const auth = useAuth();
  console.log("i am user ", userId);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast(response.message, {
          appearance: "error",
          autoDismiss: true,
        });
        return history("/");
      }

      setLoading(false);
    };
    getUser();
  }, [userId, history]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    if (friends) {
      const friendIds = friends.map((friend) => friend.to_user._id);
      const index = friendIds.indexOf(userId);

      if (index !== -1) {
        return true;
      }
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setrequestInProgres(true);
    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      toast("Friend Remove succesfully", {
        appearance: "success",
      });
    }
    setrequestInProgres(false);
  };

  const handleAddFriendClick = async () => {
    setrequestInProgres(true);
    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast("Friend add succesfully", {
        appearance: "success",
      });
    }

    setrequestInProgres(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="UserDP"
          className={styles.userDp}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgres}
          >
            {requestInProgres ? " Remove friend..." : " Remove friend"}
            <ToastContainer />
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgres}
          >
            {requestInProgres ? " Add friend..." : " Add friend"}
            <ToastContainer />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
