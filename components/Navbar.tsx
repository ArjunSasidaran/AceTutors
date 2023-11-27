import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full flex items-center justify-between'>
      <div className='w-full max-w-6xl m-auto py-7 flex items-center justify-between'>
        <strong style={{ fontWeight: 'bolder', fontSize: 'larger' }}>AceTutors</strong>
        <a href='/login'><button className='bg-cyan-950 text-white py-2 px-8 rounded'>Sign in</button></a>
      </div>
    </div>
  )
}
