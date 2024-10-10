import { Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Dashboard({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  return (
    <>
      <Navbar />
      <div className='dashboard'>
        <p>Dashboard</p>
      </div>
      <Footer />
    </>
  )
}
