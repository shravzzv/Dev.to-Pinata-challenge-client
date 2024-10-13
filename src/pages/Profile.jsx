import '../styles/Profile.css'
import { Navigate, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pin from '../components/Pin'
import Loader from '../components/Loader'

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
}

export default function Profile({ isAuthenticated, setIsAuthenticated }) {
  const [profile, setProfile] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [createdPins, setCreatedPins] = useState([])
  const [createdPinsError, setCreatedPinsError] = useState(false)
  const [savedPins, setSavedPins] = useState([])
  const [savedPinsError, setSavedPinsError] = useState(false)
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [userId])

  useEffect(() => {
    const fetchCreatedPins = async () => {
      try {
        const res = await axios.get(
          `https://devto-pinata-challenge-server-production.up.railway.app/pins?user=${userId}`
        )
        setCreatedPins(res.data)
      } catch (error) {
        setCreatedPinsError(error)
      }
    }

    fetchCreatedPins()
    return () => {}
  }, [userId])

  useEffect(() => {
    const fetchSavedPins = async () => {
      try {
        const res = await axios.get(
          `https://devto-pinata-challenge-server-production.up.railway.app/users/${userId}`
        )
        setSavedPins(res.data.savedPins)
      } catch (error) {
        setSavedPinsError(error)
      }
    }

    fetchSavedPins()
    return () => {}
  }, [userId])

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/')
  }

  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
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
      {isLoading && <Loader />}
      <Navbar />
      <div className='profile'>
        <img
          src={
            profile.profilePicUrl ||
            'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1716392632/andrew-ridley-jR4Zf-riEjI-unsplash_dszwlz.jpg'
          }
          alt='profile'
          className='scale-in-center'
        />
        <p>{profile.email}</p>
        <button onClick={handleLogout}>Logout</button>

        <h2>Created pins</h2>
        <div className='createdPins'>
          {createdPins?.map((pin) => (
            <Pin key={pin._id} title={pin.title} url={pin.url} id={pin._id} />
          ))}
        </div>
        {createdPins.length === 0 && (
          <p className='noPins'>There are no created pins.</p>
        )}
        {createdPinsError && (
          <p className='pinsFetchErrorMsg'>
            An error occured while fetching created pins.
          </p>
        )}

        <h2>Saved pins</h2>
        <div className='savedPins'>
          {savedPins?.map((pin) => (
            <Pin key={pin._id} title={pin.title} url={pin.url} id={pin._id} />
          ))}
        </div>
        {savedPins.length === 0 && (
          <p className='noPins'>There are no saved pins.</p>
        )}
        {savedPinsError && (
          <p className='pinsFetchErrorMsg'>
            An error occured while fetching saved pins.
          </p>
        )}
      </div>
      <Footer />
    </>
  )
}
