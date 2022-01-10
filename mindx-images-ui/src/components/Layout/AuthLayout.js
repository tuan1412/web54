import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="vh-100 d-flex justify-center justify-content-center align-items-center">
      {children}
    </div>
  );
}
