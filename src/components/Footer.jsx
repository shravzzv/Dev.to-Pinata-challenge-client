import '../styles/Footer.css'

export default function Footer() {
  return (
    <div className='footer'>
      <div className='top'>
        <div className='left'>
          <h2>PinDrop</h2>
          <p>
            This project was created by{' '}
            <a href='https://www.github.com/shravzzv' target='_blank'>
              Sai Shravan Vadla
            </a>{' '}
            for the Dev.to&apos;s{' '}
            <a href='https://dev.to/challenges/pinata' target='_blank'>
              Pinata challenge
            </a>
            . Give this project a star on{' '}
            <a
              href='https://github.com/shravzzv/Dev.to-Pinata-challenge-client'
              target='_blank'
            >
              GitHub
            </a>
            .
          </p>
        </div>

        <div className='middle'>
          <ul>
            <li>
              <strong>Links</strong>
            </li>
            <li>
              <a href='https://dev.to' target='_blank'>
                Dev.to
              </a>
            </li>
            <li>
              <a href='https://www.wikipedia.com' target='_blank'>
                Wikipedia
              </a>
            </li>
            <li>
              <a href='https://www.google.com' target='_blank'>
                Google
              </a>
            </li>
            <li>
              <a href='https://mail.google.com' target='_blank'>
                Gmail
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <strong>Socials</strong>
            </li>
            <li>
              <a href='https://www.instagram.com/shravzzv' target='_blank'>
                Instagram
              </a>
            </li>
            <li>
              <a href='https://www.youtube.com/@shravzzv' target='_blank'>
                YouTube
              </a>
            </li>
            <li>
              <a href='https://www.x.com/@shravzzv' target='_blank'>
                X
              </a>
            </li>
            <li>
              <a href='https://www.github.com/shravzzv' target='_blank'>
                GitHub
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/in/shravzzv/' target='_blank'>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className='right'>
          <h3>Contact</h3>
          <p>Phone: +91 9014857765</p>
          <p>Mail: shravzzv@outlook.com</p>
        </div>
      </div>

      <hr />

      <div className='bottom'>
        &copy;Sai Shravan Vadla 2024. All rights reserved.
      </div>
    </div>
  )
}
