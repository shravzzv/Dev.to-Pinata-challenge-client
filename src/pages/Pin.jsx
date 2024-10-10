import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Pin() {
  const { id } = useParams()

  return (
    <>
      <Navbar />
      <p>Pin page</p>
      <Footer />
    </>
  )
}
