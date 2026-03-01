import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
    </div>
  );
}
