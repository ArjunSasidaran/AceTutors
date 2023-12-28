import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from 'pages/afterauthpagestudent/afterauthpage.module.css';


import {firestore} from "backend/server.js";
import {collection,query,where,getDocs} from "@firebase/firestore" 
import { debounce } from 'lodash';


const Index = () => {
// search value
const [input, setInput] = useState('');
const [results, setResults] = useState([]);

const fetchCourseNames = async (value) => {
  try {
    const coursesRef = collection(firestore, 'Courses');
    //const q = query(coursesRef, where('course name', '==', value))
    const querySnapshot = await getDocs(coursesRef);
   
    const courseNames = querySnapshot.docs.map((doc) => doc.data()['course name']);
    console.log(courseNames);
    const results = courseNames.filter((course) => {
      return (
        value &&
        course &&
        course.toLowerCase().includes(value.toLowerCase())
      );
  });
    setResults(results);
  } catch (error) {
    console.error('Error fetching course names:', error.message);
  }
};

const debouncedFetchCourseNames = debounce(fetchCourseNames, 5000);

const handleChange = (value) =>{
  setInput(value)
  debouncedFetchCourseNames(value)
}
 
  return (
   
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
          <div className={styles.searchResults}>
            {results.map((courseName, index) => (
              <a key={index} href="/calender">
                <button className={styles.resultButton}>{courseName}</button>
              </a>
            ))}
          </div>
        </form>
  );
};

export default Index;