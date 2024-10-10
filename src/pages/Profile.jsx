import '../styles/Profile.css'
import { Navigate, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import axios from 'axios'

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
}

export default function Profile({ isAuthenticated, setIsAuthenticated }) {
  const [profile, setProfile] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const res = await axios.get(
          `https://devto-pinata-challenge-server-production.up.railway.app/users/${userId}`
        )
        setProfile(res.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {}
  }, [])

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')
  }

  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <p>Loading...</p>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <p>An error occured while fetching the data!</p>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className='profile'>
        <img
          src={
            profile.profilePicUrl ||
            'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1716392632/andrew-ridley-jR4Zf-riEjI-unsplash_dszwlz.jpg'
          }
          alt='profile'
        />
        <p>{profile.email}</p>
        <button onClick={handleLogout}>Logout</button>
        <div className='createdPins'>
          <h2>Created pins</h2>
        </div>
        <div className='savedPins'>
          <h2>Saved pins</h2>
        </div>
      </div>
      <Footer />
    </>
  )
}
