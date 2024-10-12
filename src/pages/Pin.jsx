import '../styles/PinPage.css'
import { Link, Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

Pin.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Pin({ isAuthenticated }) {
  const { id } = useParams()
  const userId = localStorage.getItem('userId')

  const [pin, setPin] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await axios.get(
          `https://devto-pinata-challenge-server-production.up.railway.app/pins/${id}`
        )
        setPin(res.data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPin()
    return () => {}
  }, [id])

  useEffect(() => {
    const fetchSavedPins = async () => {
      try {
        const res = await axios.get(
          `https://devto-pinata-challenge-server-production.up.railway.app/users/${userId}`
        )
        if (res.data.savedPins.some((pin) => pin._id === id)) {
          setIsSaved(true)
        }
      } catch (error) {
        setError(error)
      }
    }

    fetchSavedPins()
    return () => {}
  }, [userId, id])

  const handleSave = async () => {
    if (!isSaved) {
      try {
        await axios.post(
          `https://devto-pinata-challenge-server-production.up.railway.app/pins/save/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setIsSaved(true)
      } catch (error) {
        setSaveError(error)
      }
    } else {
      try {
        await axios.post(
          `https://devto-pinata-challenge-server-production.up.railway.app/pins/unsave/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setIsSaved(false)
      } catch (error) {
        setSaveError(error)
      }
    }
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
      <div className='pinPage'>
        <div className='imageContainer'>
          <img src={pin.url} alt={pin.title} />
        </div>
        <div className='texts'>
          <div className='user'>
            <img
              src={
                pin.user.profilePicUrl ||
                'https://res.cloudinary.com/dmt9s5xlh/image/upload/v1716392632/andrew-ridley-jR4Zf-riEjI-unsplash_dszwlz.jpg'
              }
              alt={pin.user.email}
            />
            <p>{pin.user.email}</p>
          </div>
          <p className='title'>{pin.title}</p>
          <p className='desc'>{pin.description}</p>
          <p className='tags'>
            {pin.tags.map((tag, idx) => (
              <Link
                to={`/dashboard/search?tag=${tag}`}
                className='tag'
                key={idx}
              >
                {tag}
              </Link>
            ))}
          </p>
          <button onClick={handleSave}>{isSaved ? 'Unsave' : 'Save'}</button>
          {saveError && <p>An error occured while saving the pin.</p>}
        </div>
      </div>
      <Footer />
    </>
  )
}
