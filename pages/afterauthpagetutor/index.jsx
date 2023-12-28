import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from 'pages/afterauthpagetutor/afterauthpage.module.css';
import Link from "next/link";

const Index = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const fetchData = (value) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((item) => (
          value &&
          item &&
          item.title &&
          item.title.toLowerCase().includes(value.toLowerCase())
        ));
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div
      className="max-w-6xl m-auto flex"
      style={{ height: "90vh" }}
    >
      {/* Dashboard at the left */}
      <div className="flex-1 p-4">
        <h1 className="font-bold text-5xl text-cyan-950 fade-in">Dashboard</h1>
        <p className="mb-10">
          Place to view all your listings.
        </p>
      </div>

      {/* Search bar on the right */}
      <div className={`flex-1 ${styles.container}`}>
        <div className={styles.container2}>
          <a href="/calendar">
            <button><FaSearch /></button>
          </a>
          <input
            type="search"
            placeholder="Search Courses"
            className={styles.searchbar}
            onChange={(e) => handleChange(e.target.value)}
            value={input}
          />
        </div>
        <div className={styles.searchResults}>
          {results.map((result) => (
            <a key={result.id} href="/calendar">
              <button className={styles.resultButton}>{result.title}</button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
