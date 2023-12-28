import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "pages/afterauthpagetutor/afterauthpage.module.css";
import Link from "next/link";
import Box from "./Box"; // Import the Box component

import { firestore } from "backend/server.js";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { debounce } from "lodash";

const Index = () => {
  // search value
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchCourseNames = async (value) => {
    try {
      const coursesRef = collection(firestore, "Courses");
      //const q = query(coursesRef, where('course name', '==', value))
      const querySnapshot = await getDocs(coursesRef);

      const courseNames = querySnapshot.docs.map(
        (doc) => doc.data()["course name"]
      );
      console.log(courseNames);
      const results = courseNames.filter((course) => {
        return (
          value && course && course.toLowerCase().includes(value.toLowerCase())
        );
      });
      setResults(results);
    } catch (error) {
      console.error("Error fetching course names:", error.message);
    }
  };

  const debouncedFetchCourseNames = debounce(fetchCourseNames, 5000);

  const handleChange = (value) => {
    setInput(value);
    debouncedFetchCourseNames(value);
  };

  return (
    <div className="max-w-6xl m-auto flex" style={{ height: "90vh" }}>
      {/* Dashboard at the left */}
      <div className="flex-1 p-4">
        <h1 className="font-bold text-5xl text-cyan-950 fade-in">Dashboard</h1>
        <p className="mb-10">Place to view all your listings.</p>

        <Box
          coursename="Math 2030"
          bio="My name is John, I got an A+ in this course."
          details="Contact Details: xyz@gmail.com"
        />
        <Box
          coursename="EECS 2031"
          bio="My name is Jake, I got an A+ in this course."
          details="Contact Details: xyz@gmail.com"
        />
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
          <div className={styles.searchResults}>
            {results.map((courseName, index) => (
              <a key={index} href="/calender">
                <button className={styles.resultButton}>{courseName}</button>
              </a>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
