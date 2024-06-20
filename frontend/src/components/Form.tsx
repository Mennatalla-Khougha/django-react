/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

function Form({route, method}: {route: string, method: string}) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        try {
            const respond = await api.post(route, {
                username: userName,
                password,
            })

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, respond.data.access)
                localStorage.setItem(REFRESH_TOKEN, respond.data.refresh)
                navigate('/')
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            alert(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <form onSubmit={handleSubmit}
        className='flex flex-col w-[400px] mx-auto mt-10 p-4 bg-gray-200 rounded-lg shadow-lg justify-center items-center'
    >
        <h1 className='text-3xl font-bold'>
            {method === "login" ? "Login" : "Register"}
        </h1>
        <label>
            Username
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className='w-[90%] p-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
        </label>
        <label>
            Password
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-[90%] p-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            />
        </label>

        <button type="submit"
            className='w-1/2 p-2 mt-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        >
            {method === "login" ? "Login" : "Register"}
        </button>
    </form>
  )
}

export default Form
