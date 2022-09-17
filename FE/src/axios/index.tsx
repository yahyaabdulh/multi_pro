import axios, { AxiosError, AxiosResponse } from 'axios'
import JWT from './jwtToken'

//apply base url for axios
let BASE_URL = ''
if (process) {
  BASE_URL = process?.env?.BASE_URL || 'http://localhost:5000'
}

const axiosApi = axios.create({
  baseURL: BASE_URL
})

axiosApi.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export async function get(path: string, config = {}) {
  return await axiosApi
    .get(path, {
      ...config,
      headers: {
        authorization: JWT().token
      }
    })
    .then((response : AxiosResponse) => response.data)
}

export async function post(path: string, data = {}, config = {}) {
  return axiosApi
    .post(
      path,
      { ...data },
      {
        ...config,
        headers: {
          authorization: JWT().token
        }
      }
    )
    .then(response => response.data)
}

export async function put(path: string, data = {}, config = {}) {
  return axiosApi
    .put(
      path,
      { ...data },
      {
        ...config,
        headers: {
          authorization: JWT().token
        }
      }
    )
    .then(response => response.data)
}

export async function del(path: string, config = {}) {
  return axiosApi
    .delete(path, {
      ...config,
      headers: {
        authorization: JWT().token
      }
    })
    .then(response => response.data)
}

export { AxiosError }

export async function getExcel(path: string, name: string, data={}, config = {}) {
  return await axiosApi.post(path,
    { ...data },
    {
      responseType: 'blob',
      ...config,
      headers: {
        authorization: JWT().token
      }
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response?.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${name}.xlsx`);
      document.body.appendChild(link);
      link.click();
    }).catch(({ response: error }) => {
      const reader = new FileReader();
      reader.onload = function () {
        alert(`error ` + reader?.result)
      }
      reader.readAsText(error?.data)
    });
}
