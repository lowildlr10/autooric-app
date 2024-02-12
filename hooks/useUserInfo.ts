// hooks for user info

import { useEffect, useState } from 'react'
import API from '@/utilities/API'

const useUserInfo = (accessToken: string) => {
  const [userInfo, setUserInfo] = useState<any | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setUserLoading(true)
    if (accessToken) {
      API.getCurrentUser(accessToken)
        .then((response) => {
          setUserInfo(response?.data?.data)

          if (response?.data) {
            setIsAuthenticated(true)
          }

          setUserLoading(false)
        })
        .catch((error) => {
          console.error(error.response?.data)
          setIsAuthenticated(false)
          setUserLoading(false)
        })
    } else {
      setUserLoading(false)
    }
  }, [accessToken])

  return { userInfo, isAuthenticated, userLoading }
}

export default useUserInfo
