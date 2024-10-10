import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import Create from './pages/Create'
import Search from './pages/Search'
import Profile from './pages/Profile'

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/dashboard/create',
      element: <Create />,
    },
    {
      path: 'dashboard/search',
      element: <Search />,
    },
    {
      path: 'dashboard/profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ])

  return <RouterProvider router={router} />
}
