'use client'
import { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '@/AuthProvider/AuthProvider'
 
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const useUserData = () => {
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUserData = useCallback(async () => {
    if (!user?.uid) {
      setError('No user found')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await axios.get(`${BASE_URL}/api/users/uid/${user.uid}`)
      
      if (response.data.success) {
        setUserData(response.data.user)
      } else {
        setError('User data not found')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }, [user?.uid]) // Removed loading from dependencies

  useEffect(() => {
    if (user?.uid) {
      fetchUserData()
    }
  }, [user?.uid, fetchUserData])

  return { userData, loading, error }
}