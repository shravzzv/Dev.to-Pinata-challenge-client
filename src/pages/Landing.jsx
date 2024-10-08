import '../styles/Landing.css'
import Footer from '../components/Footer'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Landing() {
  const [signUpFormData, setSignUpFormData] = useState({
    email: '',
    password: '',
  })

  const [signInFormData, setSignInFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()
  const signUpDialogRef = useRef(null)
  const signInDialogRef = useRef(null)

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault()

    const res = await axios.post(
      'https://devto-pinata-challenge-server-production.up.railway.app/users/signup',
      signUpFormData
    )

    localStorage.setItem('token', res.data.token)
    navigate('/dashboard')
  }

  const handleSignInFormSubmit = async (e) => {
    e.preventDefault()

    const res = await axios.post(
      'https://devto-pinata-challenge-server-production.up.railway.app/users/signin',
      signInFormData
    )

    localStorage.setItem('token', res.data.token)
    navigate('/dashboard')
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
