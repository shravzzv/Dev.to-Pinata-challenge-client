import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import Create from './pages/Create'
import Search from './pages/Search'
import Profile from './pages/Profile'
import { useState } from 'react'

export default function Router() {
  const token = localStorage.getItem('token')
  const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false)

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Landing
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
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
