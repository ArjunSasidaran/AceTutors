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
          placeholder="Type Here"
          className="w-full p-4 rounded-full bg-cyan-950"
        />
      </div>  
    </form>
  );
};

export default Index;
