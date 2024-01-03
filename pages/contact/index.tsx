import React from 'react';
import styles from 'pages/contact/contact.module.css'; // Import the CSS file

const Index = () => {
  return (
    <div className={styles.container}>
      <p>
        Send us an email at{' '}
        <strong className={styles.email}>contact@example.com</strong>, and we will get back to you in a couple of hours.
      </p>
    </div>
  );
};

export default Index;
