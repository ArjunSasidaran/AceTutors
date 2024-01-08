import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "pages/afterauthpagetutor/afterauthpage.module.css";
import Box from "./Box";
import { firestore } from "backend/server.js";
import { collection, getDocs, deleteDoc, query, where, doc } from 'firebase/firestore';
import { debounce } from "lodash";

const Index = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [tutorUsername, setTutorUsername] = useState("");
  const [subCollectionData, setSubCollectionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("courseData");
        if (storedData) {
          setResults(JSON.parse(storedData));
        } else {
          const coursesRef = collection(firestore, "Courses");
          const querySnapshot = await getDocs(coursesRef);
          const coursesData = querySnapshot.docs.map((doc) => doc.data());

          localStorage.setItem("courseData", JSON.stringify(coursesData));
          setResults(coursesData);
        }

        const email = localStorage.getItem("userEmail");
        console.log("User Email from localStorage:", email);

        const tutorRef = collection(firestore, "UsernameTutor");
        const tutorQuery = query(tutorRef, where("Email", "==", email));
        const tutorSnapshot = await getDocs(tutorQuery);

        console.log("Tutor Snapshot:", tutorSnapshot.docs);

        if (tutorSnapshot.docs.length > 0) {
          const tutorData = tutorSnapshot.docs[0].data();
          console.log("Tutor Data:", tutorData);

          // Retrieve the "Username" field
          const tutorUsername = tutorData.Username; // Update "Username" to the actual field name
          console.log("Tutor Username:", tutorUsername);

          setTutorUsername(tutorUsername);

          // Access the "Posts" subcollection within the tutor's document
          const tutorDocId = tutorSnapshot.docs[0].id; // Get the document ID
          const postsSubCollectionRef = collection(
            firestore,
            "UsernameTutor",
            tutorDocId,
            "Posts"
          ); // "Posts" is the subcollection name
          const postsSubCollectionSnapshot = await getDocs(
            postsSubCollectionRef
          );
          const postsSubCollectionData = postsSubCollectionSnapshot.docs.map(
            (doc) => doc.data()
          );
          console.log("Posts Subcollection Data:", postsSubCollectionData);

          setSubCollectionData(postsSubCollectionData);
        } else {
          console.error("No tutor data found for the provided email.");
        }
      } catch (error) {
        console.error("Error fetching or storing course names:", error.message);
      }
    };

    fetchData();
  }, []);

  const debouncedFetchCourseNames = debounce((value) => {
    const storedData = localStorage.getItem("courseData");
    console.log(storedData);
    if (storedData) {
      const filteredResults = JSON.parse(storedData).filter(
        (course) =>
          course["course name"].toLowerCase().includes(value.toLowerCase()) ||
          course["course code"].toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, 500);

  // onEdit function
  const onEdit = async (courseCode) => {
    window.location.href = '/edit-page';
  };

  // onDelete function
  const onDelete = async (courseCode) => {
    try {
      const collect = collection(firestore, "TutorCourse");
      const q = query(collect, where('course_code', '==', courseCode));
      const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    
    console.log("Successful delete");


    ////Ayamo Cooking

    const email = localStorage.getItem('userEmail');

    const tutorRef = collection(firestore, 'UsernameTutor');
    const qTutor = query(tutorRef, where('Email', '==', email));
    const tutorSnapshot = await getDocs(qTutor);

    const tutorDoc = tutorSnapshot.docs[0];
    const documentId = tutorDoc.id;

    const userRef = doc(tutorRef, documentId);
    const subCollectionRef = collection(userRef, 'Posts');

    const subCollectionQuery = query(subCollectionRef, where('course_code', '==', courseCode));
    const subCollectionSnapshot = await getDocs(subCollectionQuery);

    subCollectionSnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      window.location.href='/afterauthpagetutor'
    });

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    debouncedFetchCourseNames(value);
  };

  const handleCourseClick = (courseCode, courseName) => {
    localStorage.setItem(
      "selectedCourse",
      JSON.stringify({ courseCode, courseName })
    );
  };

  return (
    <div className="max-w-6xl m-auto flex">
      {/* Dashboard at the left */}
      <div className="flex-1 p-4">
        <h1 className="font-bold text-5xl text-cyan-950 fade-in">Dashboard</h1>
        <p className="mb-10">Place to view all your listings.</p>

        {/* Display tutor's username
        <p>Tutor's Username: {tutorUsername}</p> */}

        {/* Display "Posts" subcollection data */}
        {subCollectionData.length > 0 && (
          <div
            style={{
              height: "90vh",
              overflowY: "scroll",
              marginBottom: "40px",
            }}
          >
            {/* <h2>Posts Subcollection Data:</h2> */}
            <ul>
              {subCollectionData.map((post, index) => (
                <Box
                  key={index}
                  coursename={post.course_name}
                  bio={post.bio}
                  avail={post.avail}
                  contact={post.contact}
                  coursecode={post.course_code}
                  onEdit={() => onEdit(post.course_code)} // Pass the function correctly
                  onDelete={() => onDelete(post.course_code)} // Pass the onDelete function if needed
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Search bar on the right */}
      <div className={`flex-1 ${styles.container}`}>
        <form className={styles.container} action="/calender">
          <div className={styles.container2}>
            <a href="/calender">
              <button>
                <FaSearch />
              </button>
            </a>
            <input
              type="search"
              placeholder="Search Your Courses"
              className={styles.searchbar}
              onChange={(e) => handleChange(e.target.value)}
              value={input}
            />
          </div>
          {/* Conditionally render search results */}
          {input && (
            <div className={styles.searchResults}>
              {results.map((course, index) => (
                <a
                  key={index}
                  href="/calender"
                  onClick={() =>
                    handleCourseClick(
                      course["course code"],
                      course["course name"]
                    )
                  }
                >
                  <button className={styles.resultButton}>
                    {course["course code"]} - {course["course name"]}
                  </button>
                </a>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Index;
