// Box.js
import React from 'react';

const Box = ({ bio, details }) => {
  return (
    <div className="relative bg-white p-4 shadow-xl rounded-md">
      <div className="z-10 relative">
        <p className="text-lg mb-2">{bio}</p>
        <p className="text-sm text-gray-500">{details}</p>
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 shadow-xl rounded-md z-0" style={{ marginTop: '-10px' }}></div>
    </div>
  );
};

export default Box;
