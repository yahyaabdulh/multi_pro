// ** React Imports
import { createContext, ReactNode, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import { post } from 'src/axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, ErrCallbackType, LoginParams, RegisterParams, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {

  let users = null
  if (typeof window !== 'undefined') {
    // browser code
    const userData = window.localStorage.getItem('userData')!
    if (typeof userData === 'string') {
      users = JSON.parse(userData) || null
    }
  }

  // ** States
  const [user, setUser] = useState<UserDataType | null>(users)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()
  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    post(authConfig.loginEndpoint, params)
      .then((response) => {
        const returnUrl = router.query.returnUrl
        const { token, ...data } = response
        window.localStorage.setItem(authConfig.storageTokenKeyName, token)
        setUser({ ...data, role: 'admin' })
        window.localStorage.setItem('userData', JSON.stringify({ ...data, role: 'admin' }))
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.storageRefreshTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ username: params.username, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
