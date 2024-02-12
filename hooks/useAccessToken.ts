import { useCallback, useEffect, useState } from 'react'

const KEY = 'access_token'

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>()

  // get access tojen from local storage
  useEffect(() => {
    setAccessTokenFromLocalStorage()
  }, [])

  const flushToken = useCallback(() => {
    localStorage.removeItem(KEY)
    setAccessToken(undefined)
  }, [])

  const setAccessTokenFromLocalStorage = useCallback(() => {
    if (localStorage) {
      setAccessToken(localStorage.getItem(KEY) ?? null)
    }
  }, [])

  const saveAccessTokenToLocalStorage = useCallback((token: string) => {
    if (localStorage) {
      localStorage.setItem(KEY, token)
      setAccessToken(token)
    }
  }, [])

  const forceRelogin = useCallback(() => {
    flushToken()
    window.location.href = '/'
  }, [flushToken])

  const saveAccessToken = useCallback(
    (token: string) => {
      if (token) {
        saveAccessTokenToLocalStorage(token)
      }
    },
    [saveAccessTokenToLocalStorage]
  )

  return {
    accessToken,
    setAccessToken,
    flushToken,
    setAccessTokenFromLocalStorage,
    saveAccessTokenToLocalStorage,
    forceRelogin,
    saveAccessToken,
  }
}

export default useAccessToken
