import '../styles/Dashboard.css'
import { Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pin from '../components/Pin'

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Dashboard({ isAuthenticated }) {
  const [pins, setPins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await axios.get(
          'https://devto-pinata-challenge-server-production.up.railway.app/pins'
        )
        setPins(res.data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPins()
    return () => {}
  }, [])

  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An error occured while fetching the pins!</p>
  }

  return (
    <>
      <Navbar />
      <div className='dashboard'>
        {pins.map((pin) => (
          <Pin key={pin._id} title={pin.title} url={pin.url} id={pin._id} />
        ))}
      </div>
      <Footer />
    </>
  )
}
