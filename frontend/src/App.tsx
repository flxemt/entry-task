import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { notification } from 'antd'
import axios from 'axios'

import { useStore } from './store'
import HomePage from './pages/HomePage'
import ChartPage from './pages/ChartPage'

const baseURL = import.meta.env.VITE_APP_API_BASEURL

function App() {
  // Zustand
  const store = useStore()

  // Initial component mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get(`${baseURL}/users`)
        store.setUsers(res.data)
      } catch {
        notification.open({
          message: 'Error',
          description: `Can't fetch data. Check your network connection`,
          duration: 5
        })
      }
    }

    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="chart" element={<ChartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
