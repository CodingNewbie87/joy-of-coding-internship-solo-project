'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaTasks } from "react-icons/fa";
import classnames from 'classnames'

const NavBar = () => {
    const currentPath = usePathname()
   

    const links = [
        { label: 'Tasks', href: '/tasks'}
        
    ]
  return (
    <nav className='flex space-x-5 mb-4 border-b-2 px-5 h-12 items-center'>
      <Link href='/'><FaTasks/></Link>
      <ul className='flex space-x-5'>
        {links.map(link =>
        <Link key={link.href} 
        className={classnames({
            'text-zinc-900': link.href === currentPath,
            'text-zinc-500': link.href !== currentPath,
            'hover:text-zinc-900 transition-colors': true
        })} 
        href={link.href}>{link.label}</Link>)}
      </ul>
    </nav>
  )
}

export default NavBar
