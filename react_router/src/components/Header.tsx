import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <div>
      <nav className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        <Link to=''>Home</Link>
        <Link to='contact'>Contact</Link>
        <NavLink to='about' className={({ isActive }) => isActive ? 'text-red-500' : ''}>About</NavLink>
        <NavLink to="github" className={({ isActive }) => isActive ? 'text-red-500' : ''}>Github</NavLink>
      </nav>
    </div>
  )
}

export default Header