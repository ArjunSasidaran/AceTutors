// JSX file (e.g., index.jsx)
import React, { useRef, useState, useEffect } from "react";
import styles from "./edit-page.module.css";
import { firestore } from "backend/server.js";
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

const Index = () => {
  const ref = collection(firestore, "TutorCourse");
  const bio = useRef();
  const avail = useRef();
  const contact = useRef();

  // const onEdit = async (courseCode) => {
  //   try {
  //     const q = query(ref, where('course_code', '==', courseCode));
  //     const querySnapshot = await getDocs(q);

  //     const courseDoc = querySnapshot.docs[0];
  //     const courseData = courseDoc.data();

  //     bio.current.value = courseData.bio;
  //     avail.current.value = courseData.avail;
  //     contact.current.value = courseData.contact;

  //     document.getElementById('displayBio').innerText = courseData.bio;
  //     document.getElementById('displayAvailability').innerText = courseData.avail;
  //     document.getElementById('displayContact').innerText = courseData.contact;

  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleSave = async (e) => {
    e.preventDefault();

    // Replace 'yourCourseCode' with the actual logic to get the course code
    const selectedCourse = JSON.parse(localStorage.getItem("selectedCourse"));
    const selectedCourseCode = selectedCourse ? selectedCourse.coursecode : null;

    //await onEdit(selectedCourseCode);

    // Add your logic here for saving the form data or any other client-side functionality
    let data = {
      bio: bio.current.value,
      avail: avail.current.value,
      contact: contact.current.value,
    }
  
    try {
      const q = query(ref, where('course_code', '==', selectedCourseCode));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        console.log("Updating document with ID:", doc.id);
        await updateDoc(docRef, data);
        console.log("Data to Update:", data);
        console.log("Document updated successfully");
      });

      const email = localStorage.getItem('userEmail');

      const tutorRef = collection(firestore, 'UsernameTutor');
      const qTutor = query(tutorRef, where('Email', '==', email));
      const tutorSnapshot = await getDocs(qTutor);

      const tutorDoc = tutorSnapshot.docs[0];
      const documentId = tutorDoc.id;

      const userRef = doc(tutorRef, documentId);
      const subCollectionRef = collection(userRef, 'Posts');

      const subCollectionQuery = query(subCollectionRef, where('course_code', '==', selectedCourseCode));
      const subCollectionSnapshot = await getDocs(subCollectionQuery);

      subCollectionSnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, data);
      });
    
    } catch (error) {
      console.log(error.message);
      return;
    }

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
