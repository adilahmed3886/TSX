// import React from 'react'
import Address from "./Address";
import { Link, Outlet, useLocation } from "react-router-dom";

function About() {
  const location = useLocation();
  const isRootAbout = location.pathname === "/about";

  return (
    <div className="p-4 w-full text-center">
      {isRootAbout && (
        <>
          <h1 className="text-2xl font-bold mb-4">About Page</h1>
          <p className="mb-4">This is the about page content.</p>
          <Link to="address" className="text-blue-500 hover:underline">
            View Address
          </Link>
        </>
      )}

      <Outlet />
    </div>
  );
}

export default About;
