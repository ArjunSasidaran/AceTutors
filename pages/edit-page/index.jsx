// JSX file (e.g., index.jsx)
import React, { useRef, useState, useEffect } from "react";
import styles from "./edit-page.module.css";
import { firestore } from "backend/server.js";
import { collection, getDocs, query, where } from 'firebase/firestore';

const Index = () => {
  const bio = useRef();
  const avail = useRef();
  const contact = useRef();

  const [selectedCourse, setSelectedCourse] = useState({
    courseCode: "",
    courseName: "",
  });

  useEffect(() => {
    const storedCourse = localStorage.getItem("selectedCourse");
    if (storedCourse) {
      setSelectedCourse(JSON.parse(storedCourse));
    }
  }, []);

  const onEdit = async (courseCode) => {
    try {
      const collect = collection(firestore, "TutorCourse");
      const q = query(collect, where('course_code', '==', courseCode));
      const querySnapshot = await getDocs(q);

      const courseDoc = querySnapshot.docs[0];
      const courseData = courseDoc.data();

      bio.current.value = courseData.bio;
      avail.current.value = courseData.avail;
      contact.current.value = courseData.contact;

      document.getElementById('displayBio').innerText = courseData.bio;
      document.getElementById('displayAvailability').innerText = courseData.avail;
      document.getElementById('displayContact').innerText = courseData.contact;

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Replace 'yourCourseCode' with the actual logic to get the course code
    const selectedCourse = JSON.parse(localStorage.getItem("selectedCourse"));
    const selectedCourseCode = selectedCourse ? selectedCourse.coursecode : null;

    await onEdit(selectedCourseCode);

    // Add your logic here for saving the form data or any other client-side functionality

    e.target.reset();
    alert('Your listing has been edited successfully!');
    window.location.href = '/afterauthpagetutor'; // Redirect to the dashboard page
  };

  useEffect(() => {
    try {
      const selectedCourse = JSON.parse(localStorage.getItem("selectedCourse"));
      const selectedCourseCode = selectedCourse ? selectedCourse.coursecode : null;
      console.log("Course Code:", selectedCourseCode);
      onEdit(selectedCourseCode);
    } catch (error) {
      console.log("Error while extracting course code:", error.message);
    }
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div className={styles.create}>
      <h2 className={styles.createh2}>Editing Your Listing for {selectedCourse.coursecode} -{" "}
        {selectedCourse.coursename}{" "}</h2>

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
