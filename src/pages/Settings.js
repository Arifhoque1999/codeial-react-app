import React from "react";
import { useState } from "react";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { toast, ToastContainer } from "react-toastify";

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user ? auth.user.name : " ");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);

  const clearFrom = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      toast("Please Enter Name,confirmPassword & password", {
        appearance: "error",
        autoDismiss: true,
      });
      error = true;
    }
    if (password !== confirmPassword) {
      toast("Please Enter confirmPassword & password sem", {
        appearance: "error",
        autoDismiss: true,
      });
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }
    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );
    console.log("I am response", response);

    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearFrom();
      return toast("User registered successfully Updated", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      toast(response.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }

    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="dp"
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user && auth.user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>
            {auth.user && auth.user.name}
          </div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? "Saving profile..." : "Save profile"}
              <ToastContainer/>
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
