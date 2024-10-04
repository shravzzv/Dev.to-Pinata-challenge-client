import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div>
      <h1>OOPS! 404</h1>
      <p>There is nothing here.</p>
      <Link to='/'>Go to home</Link>
    </div>
  )
}
