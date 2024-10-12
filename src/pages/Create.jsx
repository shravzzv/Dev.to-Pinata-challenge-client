import '../styles/Create.css'
import { Navigate, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'

Create.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Create({ isAuthenticated }) {
  const [data, setData] = useState({
    title: '',
    description: '',
    tags: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const formRef = useRef(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const formData = new FormData(formRef.current)

      await axios.post(
        'https://devto-pinata-challenge-server-production.up.railway.app/pins',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      navigate('/')
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }

  if (error) {
    return <p>An error occured while uploading the pin.</p>
  }

  return (
    <>
      {isLoading && <Loader />}
      <Navbar />
      <form
        className='create'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        ref={formRef}
      >
        <div className='formControl'>
          <label htmlFor='title'>Title*:</label>
          <input
            type='text'
            name='title'
            id='title'
            value={data.title}
            onChange={handleChange}
            required
            minLength={3}
          />
        </div>

        <div className='formControl'>
          <label htmlFor='description'>Description:</label>
          <textarea
            name='description'
            id='description'
            cols='23'
            rows='10'
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className='formControl'>
          <label htmlFor='tags'>Tags:</label>
          <input
            type='text'
            name='tags'
            id='tags'
            placeholder='tag1 ,tag2, tag3'
            value={data.tags}
            onChange={handleChange}
          />
        </div>

        <div className='formControl'>
          <label htmlFor='file'>File:*</label>
          <input type='file' name='file' id='file' required />
        </div>

        <button type='submit'>Submit</button>
      </form>
      <Footer />
    </>
  )
}
