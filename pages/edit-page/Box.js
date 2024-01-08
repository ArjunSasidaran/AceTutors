// Box.js
import React from "react";

const Box = ({
  coursename,
  bio,
  avail,
  contact,
  coursecode,
  onEdit,
  onDelete,
}) => {
  const handleBoxClick = () => {
    const selectedCourse = {
      coursename,
      bio,
      avail,
      contact,
      coursecode,
    };

    // Update selected course in localStorage
    localStorage.setItem("selectedCourse", JSON.stringify(selectedCourse));

    // Trigger the onEdit function
    onEdit(coursecode, bio, avail, contact);
  };

  return (
    <div className="mb-4 p-4 border rounded-lg shadow-xl" onClick={handleBoxClick}>
      <h2 className="text-xl font-bold">{coursename}</h2>
      <p>{coursecode}</p>
      <p>· Bio: {bio}</p>
      <p>· Availability: {avail}</p>
      <p>· Contact: {contact}</p>
      <div className="mt-4">
        <button
          onClick={() => onEdit(coursecode, bio, avail, contact)}
          className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(coursecode)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Box;
