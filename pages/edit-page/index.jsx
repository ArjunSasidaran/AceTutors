// JSX file (e.g., index.jsx)
import React, { useRef } from "react";
import styles from "./edit-page.module.css";

const Index = () => {
  const bio = useRef();
  const avail = useRef();
  const contact = useRef();

  const handleSave = (e) => {
    e.preventDefault();
    console.log(bio.current.value);
    console.log(avail.current.value);
    console.log(contact.current.value);

    // Add your logic here for saving the form data or any other client-side functionality

    e.target.reset();
    alert('Your listing has been edited successfully!');
    window.location.href = '/afterauthpagetutor'; // Redirect to the dashboard page
  };

  return (
    <div className={styles.create}>
      <h2 className={styles.createh2}>Editing Your Listing</h2>

      <div className={styles.formContainer}>
        <form onSubmit={handleSave}>
          <div className={styles.fieldContainer}>
            <label className={styles.createlabel}>Bio:</label>
            <input type="text" ref={bio} className={styles.createinput} required />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.createlabel}>Availability:</label>
            <textarea ref={avail} className={styles.createtextarea} required />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.createlabel}>Contact Details:</label>
            <input type="text" ref={contact} className={styles.createinput} required />
          </div>

          <button type="submit" className={styles.createbutton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
