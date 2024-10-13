import '../styles/Search.css'
import { Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pin from '../components/Pin'
import { useSearchParams } from 'react-router-dom'
import Loader from '../components/Loader'

Search.propTypes = {
  isAuthenticated: PropTypes.bool,
}

export default function Search({ isAuthenticated }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchParams] = useSearchParams()
  const tag = searchParams.get('tag')

  useEffect(() => {
    if (tag) {
      setSearchQuery(tag)

      const fetchData = async () => {
        try {
          setIsLoading(true)
          const res = await axios.post(
            'https://devto-pinata-challenge-server-production.up.railway.app/pins/search',
            { searchQuery: tag },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          setSearchResults(res.data)
        } catch (error) {
          setError(error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }

    return () => {}
  }, [tag])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await axios.post(
        'https://devto-pinata-challenge-server-production.up.railway.app/pins/search',
        { searchQuery },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setSearchResults(res.data)
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
      <div className='search '>
        <form onSubmit={handleSubmit} className='scale-in-center'>
          <div className='formControl'>
            <input
              type='search'
              name='searchQuery'
              id='searchQuery'
              placeholder='Search for ideas...'
              required
              minLength={1}
              maxLength={32}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        {searchResults.length === 0 && (
          <span className='noResults scale-in-center'>
            There are no results yet.
          </span>
        )}
        <div className='results'>
          {searchResults.length > 0 &&
            searchResults.map((pin) => (
              <Pin key={pin._id} title={pin.title} url={pin.url} id={pin._id} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
