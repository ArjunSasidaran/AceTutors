// Import React and CSS file
import React from "react";
import './calender.module.css';

// Create a functional component
const Index = () => {
  return (
    <div className="container">
      <ul>
        <li>
          <div className="bottom">Heading</div>
        </li>
        <li>
          <div className="bottom">Heading</div>
        </li>
        {/* Add more li elements as needed */}
      </ul>
    </div>
  );
};

// Export the component
export default Index;
