

import nav from './dataBases/nav'
import login from './dataBases/login'
export default [
  {
    url: '/businessBasic/businessBasic/userLogin/login_login',
    type: 'post',
    response: config => {
      return login
    }
  },
  {
    url: '/businessBasic/businessBasic/menumanage/widget_menu',
    type: 'post',
    response: config => {
      return nav
    }
  },
  {
    url: '/auth/logout',
    type: 'post',
    response: config => {
      return {
        result: {},
        message: '[测试接口] 注销成功'
      }
    }
  },
  {
    url: '/user/info',
    type: 'post',
    response: config => {
      return {
        code:20000,
        data:{
          roles:['测试权限1'],
          name:'拜特科技',
          avatar:''
        }
      }
    }
  },
  {
    url: '/table/list',
    // type: 'post',
    response: config => {
      return {
        code:20000,
        data:{
          items:[
            {title:'111',Author:'aaa'},
            {title:'111',Author:'aaa'},
            {title:'111',Author:'aaa'},
            {title:'111',Author:'aaa'},
            {title:'111',Author:'aaa'},
          ]
        }
      }
    }
  },

]




// _readableState,readable,_events,_eventsCount,_maxListeners,socket,connection,httpVersionMajor,httpVersionMinor,httpVersion,complete,headers,rawHeaders,trailers,rawTrailers,aborted,upgrade,url,method,statusCode,statusMessage,client,_consuming,_dumped,next,baseUrl,originalUrl,_parsedUrl,params,query,res,route,body,_body,length,app,header,get,accepts,acceptsEncodings,acceptsEncoding,acceptsCharsets,acceptsCharset,acceptsLanguages,acceptsLanguage,range,param,is,protocol,secure,ip,ips,subdomains,path,hostname,host,fresh,stale,xhr,setTimeout,_read,destroy,_addHeaderLines,_addHeaderLine,_dump,_undestroy,_destroy,push,unshift,isPaused,setEncoding,read,pipe,unpipe,on,addListener,removeListener,removeAllListeners,resume,pause,wrap,setMaxListeners,getMaxListeners,emit,prependListener,once,prependOnceListener,off,listeners,rawListeners,listenerCount,eventNames