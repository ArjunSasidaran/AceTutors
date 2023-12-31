import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "pages/afterauthpagestudent/afterauthpage.module.css";

import { firestore } from "backend/server.js";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { debounce } from "lodash";

const Index = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("courseNames");
        if (storedData) {
          setResults(JSON.parse(storedData));
        } else {
          const coursesRef = collection(firestore, "Courses");
          const querySnapshot = await getDocs(coursesRef);
          const courseNames = querySnapshot.docs.map(
            (doc) => doc.data()["course name"]
          );
          localStorage.setItem("courseNames", JSON.stringify(courseNames));
          setResults(courseNames);
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
      const filteredResults = JSON.parse(storedData).filter((course) =>
        course["course name"].toLowerCase().includes(value.toLowerCase()) || 
        course["course code"].toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, 100);

  const handleChange = (value) => {
    setInput(value);
    debouncedFetchCourseNames(value);
  };

  const handleCourseClick = (courseCode, courseName) => {
    localStorage.setItem("selectedCourse", JSON.stringify({ courseCode, courseName }));
  };

  return (
    <form className={styles.container} action="/studentViewCourses">
      <div className={styles.container2}>
        <a href="/studentViewCourses">
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
                <a key={index} onClick = {() => handleCourseClick(course["course code"],course["course name"])}>
                  <button className={styles.resultButton}>{course["course code"]} - {course["course name"]}</button>
                </a>
              ))}
            </div>
      )}
    </form>
  );
};

export default Index;
