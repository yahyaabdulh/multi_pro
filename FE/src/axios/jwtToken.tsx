import authConfig from 'src/configs/auth'

const jwtToken = () => {
  const token = window.localStorage.getItem(authConfig.storageTokenKeyName)

  return {
    token: token ? 'Bearer ' + token : ''
  }
}

export default jwtToken
