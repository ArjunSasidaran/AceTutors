// Index.js
import React, { useState, useEffect } from 'react';
import Box from './Box';
import { firestore } from "backend/server.js";
import { collection, query, getDocs, where } from "@firebase/firestore";

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState({ courseCode: "", courseName: "" });
  const [tutors, setTutors] = useState([]);

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

        const tutorData = querySnapshot.docs.map((doc) => doc.data());
        console.log(tutorData);
        setTutors(tutorData);
      } catch (error) {
        console.error('Error fetching tutor data:', error.message);
      }
    };

    compareCourseName(selectedCourse);
  }, [selectedCourse]);

  return (
    <div className="max-w-6xl m-auto p-4">
      {/* Available Tutors section at the top */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-4xl text-cyan-950 fade-in mb-10">Available Tutors for</h1>
        <h1 className='font-bold text-3xl text-cyan-950 fade-in mb-10'> {selectedCourse.courseCode} - {selectedCourse.courseName}</h1>
      </div>

      {/* Render Box components or display a message if no tutors available */}
      <div className="flex flex-col items-center">
        {tutors.length > 0 ? (
          tutors.map((tutor, index) => (
            <React.Fragment key={index}>
              <Box
                bio={tutor.bio}
                avail={tutor.avail}
                contact={tutor.contact}
              />
              {index < tutors.length - 1 && <div className="h-8" />} {/* Adjust the height for the desired space */}
            </React.Fragment>
          ))
        ) : (
          <p className="fade-in text-lg text-gray-600">Sorry, no tutors available at the moment. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default Index;
