import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import Create from './pages/Create'
import Search from './pages/Search'
import Profile from './pages/Profile'
import { useState } from 'react'
import Pin from './pages/Pin'

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
      element: <Dashboard isAuthenticated={isAuthenticated} />,
    },
    {
      path: '/dashboard/create',
      element: <Create isAuthenticated={isAuthenticated} />,
    },
    {
      path: 'dashboard/search',
      element: <Search isAuthenticated={isAuthenticated} />,
    },
    {
      path: 'dashboard/profile',
      element: (
        <Profile
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      ),
    },
    {
      path: 'dashboard/pin/:id',
      element: <Pin isAuthenticated={isAuthenticated} />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ])

  return <RouterProvider router={router} />
}
