
import list from '../../../utils/constellation/list'

// 星座黑名单.
const constellationArr = [
  '白羊', '金牛','双子', '巨蟹','狮子', '处女','天秤', '天蝎','射手', '摩羯','水瓶', '双鱼'
]

function resolveSearch (searchKey = '') {
  let mark = false // 是否为星座关键字标识.
  let xingzuo_en = '' // 所输入星座对应英文，用于跳转星座详情页.


  const str_1 = searchKey
  const str_2 = searchKey.replace(/\u5ea7|\u5750/g, '') // 将'座|坐'转为''

  const markPrev = constellationArr.includes(str_1) || constellationArr.includes(str_2)

  // searchKey是否在星座黑名单中.
  if (markPrev) {
    mark = true

    // 找到索引.
    const index = constellationArr.indexOf(str_1) >= 0 ? constellationArr.indexOf(str_1) : constellationArr.indexOf(str_2)

    // 通过索引，找到list中的星座所对应的英文，用于返回.
    const xingzuo = constellationArr[index] + '座'
    list.tabList.map((item) => {
      const name = item.name || ''
      if (name == xingzuo) {
        xingzuo_en = item.en
      }

    })

  }

  return {
    mark,
    xingzuo_en
  }

}

export {
  resolveSearch
}