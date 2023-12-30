// JSX file (e.g., index.jsx)
import React, { useRef } from "react";
import styles from "./calender.module.css";
import { firestore } from "backend/server.js";
import { addDoc, collection } from "@firebase/firestore";

const Index = () => {
  const ref = collection(firestore, "TutorCourse");
  const bio = useRef();
  const avail = useRef();
  const contact = useRef();

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(bio.current.value);
    console.log(avail.current.value);
    console.log(contact.current.value);
    let data = {
      bio: bio.current.value,
      avail: avail.current.value,
      contact: contact.current.value,
    };
    try {
      await addDoc(ref, data);
      e.target.reset();
      alert('Form submitted successfully!');
      
      // Redirect to the dashboard page
      window.location.href = '/afterauthpagetutor';

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.create}>
      <h2 className={styles.createh2}>Become a Tutor for CourseName</h2>

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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
