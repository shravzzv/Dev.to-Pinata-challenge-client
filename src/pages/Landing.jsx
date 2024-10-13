import '../styles/Landing.css'
import Footer from '../components/Footer'
import { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
}

export default function Landing({ isAuthenticated, setIsAuthenticated }) {
  const [signUpFormData, setSignUpFormData] = useState({
    email: '',
    password: '',
  })
  const [signInFormData, setSignInFormData] = useState({
    email: '',
    password: '',
  })
  const [isEmailErrorSignUp, setIsEmailErrorSignUp] = useState(false)
  const [isEmailErrorSignIn, setIsEmailErrorSignIn] = useState(false)
  const [isPasswordErrorSignIn, setIsPasswordErrorSignIn] = useState(false)

  const navigate = useNavigate()
  const signUpDialogRef = useRef(null)
  const signInDialogRef = useRef(null)

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsEmailErrorSignUp(false)
      const res = await axios.post(
        'https://devto-pinata-challenge-server-production.up.railway.app/users/signup',
        signUpFormData
      )

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (error) {
      if (error?.response?.data?.some((err) => err.path === 'email'))
        setIsEmailErrorSignUp(true)
    }
  }

  const handleSignInFormSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsEmailErrorSignIn(false)
      setIsPasswordErrorSignIn(false)
      const res = await axios.post(
        'https://devto-pinata-challenge-server-production.up.railway.app/users/signin',
        signInFormData
      )

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.userId)
      setIsAuthenticated(true)
      navigate('/dashboard')
    } catch (error) {
      if (error?.response?.data?.some((err) => err.path === 'email'))
        setIsEmailErrorSignIn(true)
      if (error?.response?.data?.some((err) => err.path === 'password'))
        setIsPasswordErrorSignIn(true)
    }
  }

  const handleSignUpFormDataChange = (e) => {
    const { name, value } = e.target
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    })
  }

  const handleSignInFormDataChange = (e) => {
    const { name, value } = e.target
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    })
  }

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} replace />
  }

  return (
    <div className='landing'>
      <div className='hero'>
        <h1 className='tracking-in-expand'>Get your next big ideas</h1>
        <p className='scale-in-center'>
          Our platform is your treasure trove for fresh, innovative concepts.
          Discover the inspiration you need to fuel your next big project. Start
          exploring today and let your creativity soar.
        </p>
        <div className='buttons'>
          <button
            className='cta scale-in-center'
            onClick={() => signUpDialogRef.current.showModal()}
          >
            Sign Up
          </button>

          <button
            className='cta scale-in-center'
            onClick={() => signInDialogRef.current.showModal()}
          >
            Sign in
          </button>
        </div>
      </div>

      <dialog id='signup' ref={signUpDialogRef} className='slide-in-top'>
        <form onSubmit={handleSignUpFormSubmit}>
          <div className='formControl'>
            <label htmlFor='signUpEmail'>Email:*</label>
            <input
              type='email'
              name='email'
              id='signUpEmail'
              autoComplete='on'
              value={signUpFormData.email}
              onChange={handleSignUpFormDataChange}
              required
            />
            {isEmailErrorSignUp && (
              <span className='error'>Email already exists.</span>
            )}
          </div>

          <div className='formControl'>
            <label htmlFor='signUpPassword'>Password:*</label>
            <input
              type='password'
              name='password'
              id='signUpPassword'
              value={signUpFormData.password}
              onChange={handleSignUpFormDataChange}
              required
              minLength={8}
            />
          </div>

          <div className='buttons'>
            <button type='submit'>Sign Up</button>
            <button
              type='button'
              onClick={() => signUpDialogRef.current.close()}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      <dialog id='signin' ref={signInDialogRef} className='slide-in-top'>
        <form onSubmit={handleSignInFormSubmit}>
          <div className='formControl'>
            <label htmlFor='signInEmail'>Email:</label>
            <input
              type='email'
              name='email'
              id='signInEmail'
              autoComplete='on'
              value={signInFormData.email}
              onChange={handleSignInFormDataChange}
              required
            />
            {isEmailErrorSignIn && (
              <span className='error'>Email doesn&apos;t exist.</span>
            )}
          </div>

          <div className='formControl'>
            <label htmlFor='signInPassword'>Password</label>
            <input
              type='password'
              name='password'
              id='signInPassword'
              value={signInFormData.password}
              onChange={handleSignInFormDataChange}
              required
              minLength={8}
            />
            {isPasswordErrorSignIn && (
              <span className='error'>Incorrect password.</span>
            )}
          </div>

          <div className='buttons'>
            <button type='submit'>Sign In</button>
            <button
              type='button'
              onClick={() => signInDialogRef.current.close()}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      <Footer />
    </div>
  )
}
