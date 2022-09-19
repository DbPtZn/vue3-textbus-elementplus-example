let base_url: string = ''
// console.log(process.env.NODE_ENV)
// 根据环境变量配置不同的base_url
if (process.env.NODE_ENV == 'development') {    
    base_url = 'http://localhost'
} else if (process.env.NODE_ENV == 'debug') {    
    base_url = 'http://xxx.xxx.xx.xxx:xxxx/'
} else if (process.env.NODE_ENV == 'production') {    
    base_url = 'http://xxx.xxx.xx.xxx:xxxx/'
}


export const BASE_URL = base_url