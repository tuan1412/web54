import React from 'react'
import Navbar from '../Navbar';

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {children}
      </div>
    </div>
  )
}
