import '../styles/PinComponent.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

Pin.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
}

export default function Pin({ url, title, id }) {
  return (
    <Link to={`/dashboard/pin/${id}`} className='pin flip-in-hor-bottom'>
      <img src={url} alt={title} />
    </Link>
  )
}
