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
}) => (
  <div className="mb-4 p-4 border rounded-lg shadow-xl">
    <h2 className="text-xl font-bold">{coursename}</h2>
    <p>{coursecode}</p>
    <p>· Bio: {bio}</p>
    <p>· Availability: {avail}</p>
    <p>· Contact: {contact}</p>
    <div className="mt-4">
      <button
        onClick={onEdit}
        className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
);

export default Box;
