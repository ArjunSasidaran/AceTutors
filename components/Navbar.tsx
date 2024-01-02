import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;
  
    if (
      currentUrl.includes('/afterauthpagestudent') ||
      currentUrl.includes('/afterauthpagetutor') ||
      currentUrl.includes('/calender') ||
      currentUrl.includes('/studentViewCourses')
    ) {
      setLoggedIn(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions (e.g., clear tokens)
    setLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='w-full max-w-6xl m-auto py-7 flex items-center justify-between'>
        <a href='/'>
          <strong style={{ fontWeight: 'bolder', fontSize: 'larger' }}>AceTutors</strong>
        </a>

        {isLoggedIn ? (
          // Render Logout option if the user is logged in
          <button onClick={handleLogout} className='bg-cyan-950 text-white py-2 px-8 rounded'>
            Logout
          </button>
        ) : (
          // Render Sign Up button if the user is not logged in
          <a href='/login/both-login'>
            <button className='bg-cyan-950 text-white py-2 px-8 rounded'>Sign Up</button>
          </a>
        )}
      </div>
    </div>
  );
}
