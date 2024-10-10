import { Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'

Create.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Create({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  return (
    <>
      <Navbar />
      <div className='create'>
        <p>Create</p>
      </div>
      <Footer />
    </>
  )
}
