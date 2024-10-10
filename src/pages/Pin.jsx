import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function Pin() {
  const { id } = useParams()
  console.log(id)

  return (
    <>
      <Navbar />
      <p>Pin page</p>
      <Footer />
    </>
  )
}
