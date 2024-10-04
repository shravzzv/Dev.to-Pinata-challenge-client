import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Error from './pages/Error'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ])

  return <RouterProvider router={router} />
}
