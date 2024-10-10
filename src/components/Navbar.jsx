import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/dashboard'>Home</Link>
        </li>
        <li>
          <Link to='/dashboard/create'>Create</Link>
        </li>
        <li>
          <Link to='/dashboard/search'>Search</Link>
        </li>
        <li>
          <Link to='/dashboard/profile'>Profile</Link>
        </li>
      </ul>
    </nav>
  )
}
