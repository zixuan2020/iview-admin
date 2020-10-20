import axios from '@/libs/api.request'

export const login = ({userName, password}) => {
  const data = {
    username: userName,
    password
  }
  return axios.request({
    url: 'user/login',
    data,
    method: 'post'
  })
}

export const getUserList = (pageNum, pageSize) => {
  if (!pageNum) pageNum = 1
  if (!pageSize) pageSize = 10

  return axios.request({
    url: 'user/list',
    params: {
      pageNum,
      pageSize
    },
    method: 'get'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
