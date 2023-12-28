import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from 'pages/afterauthpagestudent/afterauthpage.module.css';


const Index = () => {
  // search value
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  
  const fetchData = (value) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      const results = json.filter((item) => {
        return (
          value &&
          item &&
          item.title &&
          item.title.toLowerCase().includes(value.toLowerCase())
        );
    });
    setResults(results);  
  });

  };

  const handleChange = (value) =>{
    setInput(value)
    fetchData(value)
  }
 
  return (
   
    <form className={styles.container} action = "/calender">
      <div className={styles.container2}>
        <a href = "/calender"><button><FaSearch /></button></a>
        <input
          type="search"
          placeholder="Search Your Courses"
          className={styles.searchbar}
          onChange={(e) => handleChange(e.target.value)}
          value = {input}
        />
      </div>  
      <div className={styles.searchResults}>
        {results.map((result) => (
          <a key={result.id} href= "/calender" ><button className = {styles.resultButton}>{result.title}</button></a>
        ))}
      </div>
    </form>
  );
};

export default Index;