import '../styles/PinComponent.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

Pin.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
}
export default function Pin({ url, title, id }) {
  const handleSave = (e) => {
    e.preventDefault()
  }

  return (
    <Link to={`/dashboard/pin/${id}`} className='pin'>
      <button onClick={handleSave}>Save</button>
      <img src={url} alt={title} />
    </Link>
  )
}
