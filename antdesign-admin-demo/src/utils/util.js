import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Base64 from 'js-base64'

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
/**
 * 整理form初始值 使满足后台接口
 * 日期 格式转换
 * '' null undfined [] 清除字段
 *
 * @export
 * @param {*} formValues
 */
export function form2param(formValues) {
  const seqrchParams = {}
  for (const k in formValues) {
    const item = formValues[k]
    const itemType = Object.prototype.toString.call(item)
    if (item && item._isAMomentObject === true) {
      seqrchParams[k] = item.format('YYYY-MM-DD')
    } else if (itemType === '[object Array]' && item[0] && item[0]._isAMomentObject === true) {
      const dateRangeNames = k.split('-')
      seqrchParams[dateRangeNames[0]] = item[0].format('YYYY-MM-DD')
      seqrchParams[dateRangeNames[1]] = item[1].format('YYYY-MM-DD')
    } else {
      seqrchParams[k] = item
    }
  }
  return seqrchParams
}

export function filterEmptyVal(params) {
  const newParams = {}
  for (const k in params) {
    const item = params[k]
    if (item === null || item === undefined || item.length === 0) {
      // '' null undefined []
    } else {
      newParams[k] = item
    }
  }
  return newParams
}



export function notEmpty(name) {
  return v => {
    if (!v || v.trim === '') {
      return `${name} is required`
    } else {
      return true
    }
  }
}
// 日期回显
export function formatDate(val) {
  if (!val) return ''
  const now = new Date(val)
  const y = now.getFullYear()
  const m = (now.getMonth() + 1).toString().padStart(2, 0)
  const d = now
    .getDate()
    .toString()
    .padStart(2, 0)
  return `${y}-${m}-${d}`
}

// 时间回显
export function formatDateTime(val) {
  if (!val) return ''
  const now = new Date(val)
  const y = now.getFullYear()
  const m = (now.getMonth() + 1).toString().padStart(2, 0)
  const d = now
    .getDate()
    .toString()
    .padStart(2, 0)
  const hh = now.getHours()
  const mm = now.getMinutes()
  const ss = now.getSeconds()
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
/**
 * 根据 选中情况 返回选中id值集合
 *
 * @export
 * @param {*} { current, options, selectedKeys }
 * @returns
 */
export function getTagSelected({ current, options, selectedKeys, idName = 'code' }) {
  if (current.checked) {
    if (current.value === 'total') {
      selectedKeys = options.map((i) => {
        return i[idName]
      })
    } else {
      selectedKeys.push(current.value)
    }
  } else {
    if (current.value === 'total') {
      selectedKeys = []
    } else {
      selectedKeys.splice(selectedKeys.indexOf(current.value), 1)
    }
  }
  return selectedKeys
}

export function initDefaultProps(propKeys, vm) {
  const defProps = {}
  propKeys.map((k) => {
    if (vm[k] !== undefined) {
      defProps[k] = vm[k]
    }
  })
  return defProps
}

export function getUserInfo() {
  const token = storage.get(ACCESS_TOKEN) || ''
  const infoArr = token.split('.')
  if (infoArr && infoArr.length > 1) {
    const userInfoStr = Base64.Base64.decode(infoArr[1], 'utf-8')
    return userInfoStr ? JSON.parse(userInfoStr) : {}
  }
  return {}
}
