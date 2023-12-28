// Box.js
import React from "react";

const Box = ({ coursename, bio, details, onEdit, onDelete }) => (
  <div className="mb-4 p-4 border rounded">
    <h2 className="text-xl font-bold">{coursename}</h2>
    <p className="mb-2">{bio}</p>
    <p>{details}</p>
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
