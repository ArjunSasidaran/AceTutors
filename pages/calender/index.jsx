// JSX file (e.g., index.jsx)
import React from "react";
import styles from "./calender.module.css";

const Index = () => {
  return (
    <div className={styles.create}>
      <h2 className={styles.createh2}>Become a Tutor for CourseName</h2>

      <div className={styles.formContainer}>
        <form>
          <div className={styles.fieldContainer}>
            <label className={styles.createlabel}>Bio:</label>
            <input type="text" className={styles.createinput} required />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.createlabel}>Availability:</label>
            <textarea className={styles.createtextarea} required />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.createlabel}>Contact Details:</label>
            <input type="text" className={styles.createinput} required />
          </div>

          <button type="submit" className={styles.createbutton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
