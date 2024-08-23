import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="fixed w-full">
        <ul className="bg-stone-950 flex justify-around p-2 items-center">
            <li className='text-4xl cursor-pointer'>Todo</li>
            <li className="text-3xl hover:opacity-70 duration-300 cursor-pointer"><FaGithub/></li>
        </ul>
    </nav>
  )
}

export default Navbar