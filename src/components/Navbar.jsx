import { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname == '/dashboard') setActiveLink(1)
    if (pathname == '/dashboard/create') setActiveLink(2)
    if (pathname == '/dashboard/search') setActiveLink(3)
    if (pathname == '/dashboard/profile') setActiveLink(4)
    if (
      ![
        '/dashboard',
        '/dashboard/create',
        '/dashboard/search',
        '/dashboard/profile',
      ].includes(pathname)
    ) {
      setActiveLink(null)
    }
  }, [pathname])

  return (
    <nav>
      <ul>
        <li>
          <Link
            to='/dashboard'
            className={activeLink == 1 ? 'active' : ''}
            onClick={() => setActiveLink(1)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard/create'
            className={activeLink == 2 ? 'active' : ''}
            onClick={() => setActiveLink(2)}
          >
            Create
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard/search'
            className={activeLink == 3 ? 'active' : ''}
            onClick={() => setActiveLink(3)}
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            to='/dashboard/profile'
            className={activeLink == 4 ? 'active' : ''}
            onClick={() => setActiveLink(4)}
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  )
}
