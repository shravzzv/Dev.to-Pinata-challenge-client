import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Error() {
  return (
    <div>
      <Navbar />
      <h1>OOPS! 404</h1>
      <p>There is nothing here.</p>
      <Link to='/'>Go to home</Link>
    </div>
  )
}
