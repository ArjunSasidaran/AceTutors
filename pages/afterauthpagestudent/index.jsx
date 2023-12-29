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
    const storedData = localStorage.getItem("courseNames");
    if (storedData) {
      const filteredResults = JSON.parse(storedData).filter((course) =>
        course.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, 500);

  const handleChange = (value) => {
    setInput(value);
    debouncedFetchCourseNames(value);
  };

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
      {input && (
        <div className={styles.searchResults}>
          {results.map((courseName, index) => (
            <a key={index} href="/calender">
              <button className={styles.resultButton}>{courseName}</button>
            </a>
          ))}
        </div>
      )}
    </form>
  );
};

export default Index;
