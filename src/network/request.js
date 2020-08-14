import axios from 'axios'

export function request(config) {

  // 1.创建实例
  const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000',
      timeout: 5000
    })
    // 2.请求拦截
  instance.interceptors.request.use(config => {

    return config
  }, err => {
    console.log(err);
    return err
  })

  // 响应拦截
  instance.interceptors.response.use(response => {
      return response
    }, err => {
      return err
    })
    // 3、发送网络请求请求
    // axios 实例返回是一个Promise对象
  return instance(config)

}