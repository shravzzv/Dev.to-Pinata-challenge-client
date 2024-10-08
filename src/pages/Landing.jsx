import '../styles/Landing.css'

export default function Landing() {
  return (
    <div className='landing'>
      <div className='hero'>
        <h1>Get your next big time ideas</h1>
        <p>
          Our platform is your treasure trove for fresh, innovative concepts.
          Discover the inspiration you need to fuel your next big project. Start
          exploring today and let your creativity soar.
        </p>
        <div className='buttons'>
          <button className='cta'>Sign Up</button>
          <button className='cta'>Sign in</button>
        </div>
      </div>
    </div>
  )
}
