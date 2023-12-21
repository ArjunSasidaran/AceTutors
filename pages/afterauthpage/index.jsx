import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from 'pages/afterauthpage/afterauthpage.module.css';


const Index = () => {
  return (
    <form className={styles.container}>
      <div className={styles.container2}>
        <FaSearch />
        <input
          type="search"
          placeholder="Search Your Courses"
          className={styles.searchbar}
        />
      </div>  
    </form>
  );
};

export default Index;
