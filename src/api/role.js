import axios from '@/libs/api.request'

export const getRoleList = (pageNum, pageSize) => {
  if (!pageNum) pageNum = 1
  if (!pageSize) pageSize = 10

  return axios.request({
    url: 'role/list',
    params: {
      pageNum,
      pageSize
    },
    method: 'get'
  })
}
