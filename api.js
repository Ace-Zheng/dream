
'use strict'

import { config } from './config'

const HOST_URL = config.apiUrl
// const UPLOAD_URL = config.uploadUrl

let requestApi = {
  register: HOST_URL + '/account/dreamLogin/register', // 小程序注册接口
  dataCount: HOST_URL + '/account/dreamLogin/data_count', // 数据统计接口
  get_data_12: HOST_URL + '/api/dream_page/get_data_12', // 调取12星座文章接口



  get_data: HOST_URL + '/api/dream_page/get_data', // 获取数据中间层接口

}

export { requestApi }