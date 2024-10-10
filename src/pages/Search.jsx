import { Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'

Search.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Search({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  return (
    <>
      <Navbar />
      <div className='search'>
        <p>Search</p>
      </div>
      <Footer />
    </>
  )
}
