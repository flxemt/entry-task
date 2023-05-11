import { create } from 'zustand'
import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_API_BASEURL

type StateType = {
  users: User[]

  setUsers: (data: User[]) => void
  addUser: (user: User) => Promise<void>
  editUser: (id: number | null, user: User) => Promise<void>
  removeUser: (id: number) => Promise<void>
}

export interface User {
  id: number
  name: string
  email: string
  gender: string
  address: {
    street: string
    city: string
  }
  phone: string
}

export const useStore = create<StateType>(set => ({
  users: [],

  setUsers: (data: User[]) => {
    set(() => ({ users: data }))
  },

  addUser: async (user: User) => {
    const res = await axios.post(`${baseURL}/users`, user)

    set(prevState => ({
      users: [...prevState.users, res.data]
    }))
  },

  editUser: async (id: number | null, user: User) => {
    const res = await axios.put(`${baseURL}/users/${id}`, user)

    set(prevState => ({
      users: prevState.users.map((item: User) => (item.id === id ? res.data : item))
    }))
  },

  removeUser: async (id: number) => {
    await axios.delete(`${baseURL}/users/${id}`)

    set(prevState => ({
      users: prevState.users.filter((item: User) => item.id !== id)
    }))
  }
}))
