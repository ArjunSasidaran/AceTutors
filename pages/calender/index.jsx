// JSX file (e.g., index.jsx)
import React, { useRef, useState, useEffect } from "react";
import styles from "./calender.module.css";
import { firestore } from "backend/server.js";
import {doc, addDoc, collection, query, where, getDocs } from "@firebase/firestore";

const Index = () => {
  const ref = collection(firestore, "TutorCourse");
  const bio = useRef();
  const avail = useRef();
  const contact = useRef();
  const subCollectionRef = useRef(); 

  const [selectedCourse, setSelectedCourse] = useState({ courseCode: "" }, {courseName: ""});

  useEffect(() => {
    const storedCourse = localStorage.getItem("selectedCourse");
    if (storedCourse) {
      setSelectedCourse(JSON.parse(storedCourse));
    }
    
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
      try {
        const fetchTutorData = async () => {
          const tutorRef = collection(firestore, 'UsernameTutor');
          const q = query(tutorRef, where('Email', '==', email));
          const querySnapshot = await getDocs(q);
  
          const emailFound = querySnapshot.docs[0];
          console.log(emailFound);
          const documentId = emailFound.id;
          console.log(documentId);
          const userRef = doc(tutorRef, documentId);
          subCollectionRef.current = collection(userRef,'Posts');
      };
        fetchTutorData();
      } catch (error) {
        console.error('Error fetching tutor data:', error.message);
      }
   
  }, []);



  const handleSave = async (e) => {

    e.preventDefault();
    console.log(bio.current.value);
    console.log(avail.current.value);
    console.log(contact.current.value);
    let data = {
      bio: bio.current.value,
      avail: avail.current.value,
      contact: contact.current.value,
      course_code: selectedCourse.courseCode,
      course_name: selectedCourse.courseName,
    };
    try {
      const addedDocument = await addDoc(ref, data);
      if (subCollectionRef.current){
        const addToSubCollection = await addDoc(subCollectionRef.current, data);
      }
      else{
        console.warn('subCollectionRef.current is not initialized.');
      }
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
      <h2 className={styles.createh2}>Become a Tutor for {selectedCourse.courseCode} - {selectedCourse.courseName} </h2>

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
