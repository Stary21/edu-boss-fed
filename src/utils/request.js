import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
import router from '@/router/index'
import qs from 'qs'
const request = axios.create({

})
function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagounews.com'
  } else {
    return 'http://edufront.lagounews.com'
  }
}

request.interceptors.request.use(function (config) {
  config.baseURL = getBaseURL(config.url)
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorrization = user.access_token
  }
  return config
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

let isRefreshing = false
let requests = []

request.interceptors.response.use((response) => response, (error) => {
  if (error.response) {
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (isRefreshing) {
        return request.push(() => {
          request(error.config)
        })
      }
      isRefreshing = true
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        if (res.data.state !== 1) {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }
        store.commit('setUser', res.data.content)
        requests.forEach(callback => callback())
        requests = []
        return requests(error.config)
      }).finally(() => {
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    Message.error('请求超时，请重试')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default request
