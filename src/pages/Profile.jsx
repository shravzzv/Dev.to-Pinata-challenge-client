import { Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Profile({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  return (
    <>
      <Navbar />
      <div className='profile'>
        <p>Profile</p>
      </div>
      <Footer />
    </>
  )
}
