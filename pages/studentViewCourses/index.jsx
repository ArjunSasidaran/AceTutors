// Index.js
import React, { useState, useEffect } from 'react';
import Box from './Box';
import { firestore } from "backend/server.js";
import { collection, query, getDocs, where } from "@firebase/firestore";

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState({ courseCode: "", courseName: "" });

  useEffect(() => {
    const storedCourse = localStorage.getItem("selectedCourse");
    if (storedCourse) {
      setSelectedCourse(JSON.parse(storedCourse));
    }
  }, []);

  useEffect(() => {
    const compareCourseName = async () => {
      try {
        console.log("Selected Course:", selectedCourse);
        const coursesRef = collection(firestore, 'TutorCourse');
        const q = query(coursesRef, where('course_name', '==', selectedCourse.courseName));
        const querySnapshot = await getDocs(q);

        const courseNames = querySnapshot.docs.map((doc) => doc.data());
        console.log(courseNames);
      } catch (error) {
        console.error('Error fetching course names:', error.message);
      }
    };

    compareCourseName(selectedCourse);
  }, [selectedCourse]);

  const tutors = [
    {
      bio: 'My name is John, I got an A+ in this course.',
      details: 'Contact Details: xyz@gmail.com',
    },
    {
      bio: 'My name is Jake, I got an A+ in this course.',
      details: 'Contact Details: xyz@gmail.com',
    },
    // Add more tutor data as needed
  ];

  return (
    <div className="max-w-6xl m-auto p-4">
      {/* Available Tutors section at the top */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-4xl text-cyan-950 fade-in mb-10">Available Tutors for</h1>
        <h1 className='font-bold text-3xl text-cyan-950 fade-in mb-10'> {selectedCourse.courseCode} - {selectedCourse.courseName}</h1>
      </div>

      {/* Render Box components for each tutor in a column with more space between */}
      <div className="flex flex-col items-center">
        {tutors.map((tutor, index) => (
          <React.Fragment key={index}>
            <Box
              bio={tutor.bio}
              details={tutor.details}
            />
            {index < tutors.length - 1 && <div className="h-8" />} {/* Adjust the height for the desired space */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Index;
